"""
Day 6 - Mini Project: Clean Addis Bank System

A menu-driven console program that demonstrates SOLID principles and
three design patterns working together:
  - Factory:    AccountFactory creates the right account type
  - Singleton:  BankConfig holds bank-wide rules (one shared instance)
  - Observer:   large withdrawals trigger SMS alerts + audit logging
"""

from abc import ABC, abstractmethod


# ------------------------------------------------------------------
# Singleton: bank-wide configuration
# ------------------------------------------------------------------
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.default_interest_rate = 0.05
            cls._instance.default_overdraft_limit = 500
            cls._instance.large_transaction_threshold = 3000
        return cls._instance


# ------------------------------------------------------------------
# Small, focused interfaces (ISP) that Account depends on (DIP)
# ------------------------------------------------------------------
class Notifier(ABC):
    @abstractmethod
    def notify(self, message):
        pass


class ConsoleNotifier(Notifier):
    def notify(self, message):
        print(f"[Notice] {message}")


class Repository(ABC):
    @abstractmethod
    def save(self, account):
        pass


class InMemoryRepository(Repository):
    """Keeps things simple for a console app - just logs the 'save'."""
    def save(self, account):
        print(f"[Saved] Account #{account.account_number}, "
              f"balance {account.balance:.2f}")


class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self):
        pass


class Observer(ABC):
    @abstractmethod
    def update(self, account, amount):
        pass


class SMSAlert(Observer):
    def update(self, account, amount):
        print(f"[SMS Alert] Large withdrawal of {amount:.2f} on "
              f"account #{account.account_number}!")


class AuditLog(Observer):
    def update(self, account, amount):
        print(f"[Audit Log] Withdrawal of {amount:.2f} recorded for "
              f"account #{account.account_number}.")


# ------------------------------------------------------------------
# Account hierarchy (SRP: only balance logic + observer notifications)
# ------------------------------------------------------------------
class Account(ABC):
    def __init__(self, account_number, owner, balance,
                 repository: Repository, notifier: Notifier):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self._repository = repository
        self._notifier = notifier
        self._observers = []

    def add_observer(self, observer: Observer):
        self._observers.append(observer)

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return False
        self.balance += amount
        self._repository.save(self)
        self._notifier.notify(f"{self.owner} deposited {amount:.2f}")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False
        if not self._can_withdraw(amount):
            print("Insufficient funds.")
            return False
        self.balance -= amount
        self._repository.save(self)
        self._notifier.notify(f"{self.owner} withdrew {amount:.2f}")

        threshold = BankConfig().large_transaction_threshold
        if amount > threshold:
            for observer in self._observers:
                observer.update(self, amount)
        return True

    def _can_withdraw(self, amount):
        return amount <= self.balance

    def statement(self):
        print(f"[{self.__class__.__name__}] #{self.account_number} | "
              f"Owner: {self.owner} | Balance: {self.balance:.2f}")


class SavingsAccount(Account, InterestBearing):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=None):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.interest_rate = interest_rate or BankConfig().default_interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

    def statement(self):
        print(f"[SavingsAccount] #{self.account_number} | Owner: {self.owner} | "
              f"Balance: {self.balance:.2f} | Rate: {self.interest_rate * 100:.0f}%")


class CurrentAccount(Account):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 overdraft_limit=None):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit or BankConfig().default_overdraft_limit

    def _can_withdraw(self, amount):
        return amount <= self.balance + self.overdraft_limit

    def statement(self):
        print(f"[CurrentAccount] #{self.account_number} | Owner: {self.owner} | "
              f"Balance: {self.balance:.2f} | Overdraft: {self.overdraft_limit:.2f}")


# ------------------------------------------------------------------
# Factory: the only place that knows how to construct account objects
# ------------------------------------------------------------------
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        kind = kind.lower()
        if kind == "savings":
            account = SavingsAccount(number, owner, balance, repository, notifier)
        elif kind == "current":
            account = CurrentAccount(number, owner, balance, repository, notifier)
        else:
            raise ValueError(f"Unknown account kind: {kind}")

        # Every account gets the same observers wired in automatically.
        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())
        return account


# ------------------------------------------------------------------
# Menu-driven program
# ------------------------------------------------------------------
repository = InMemoryRepository()
notifier = ConsoleNotifier()
accounts = {}  # account_number (str) -> Account instance
next_account_number = 5000


def create_account(kind):
    global next_account_number
    owner = input("Enter account owner's name: ").strip()
    try:
        balance = float(input("Enter starting balance (0 or more): "))
        if balance < 0:
            print("Starting balance cannot be negative.")
            return
    except ValueError:
        print("Invalid amount entered.")
        return

    account_number = str(next_account_number)
    next_account_number += 1

    try:
        account = AccountFactory.create(kind, owner, account_number, balance,
                                         repository, notifier)
    except ValueError as error:
        print(f"Could not create account: {error}")
        return

    accounts[account_number] = account
    print(f"{kind.capitalize()} account created! Account number: {account_number}")


def get_account():
    account_number = input("Enter account number: ").strip()
    account = accounts.get(account_number)
    if account is None:
        print("No account found with that number.")
    return account


def deposit_to_account():
    account = get_account()
    if account is None:
        return
    try:
        amount = float(input("Enter deposit amount: "))
        account.deposit(amount)
    except ValueError:
        print("Invalid amount entered.")


def withdraw_from_account():
    account = get_account()
    if account is None:
        return
    try:
        amount = float(input("Enter withdrawal amount: "))
        account.withdraw(amount)
    except ValueError:
        print("Invalid amount entered.")


def show_statement():
    account = get_account()
    if account is None:
        return
    account.statement()


def apply_interest_to_all():
    """Extra feature (per the mini-project requirements) - added without
    touching Account, CurrentAccount, or AccountFactory at all."""
    applied_any = False
    for account in accounts.values():
        if isinstance(account, InterestBearing):
            account.apply_interest()
            applied_any = True
    if not applied_any:
        print("No interest-bearing accounts to apply interest to.")


def show_all_accounts():
    if not accounts:
        print("No accounts exist yet.")
        return
    print("\n--- All Accounts ---")
    for account in accounts.values():
        account.statement()
    print("---------------------")


def show_menu():
    print("\n=== Clean Addis Bank System ===")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Deposit")
    print("4. Withdraw")
    print("5. Show statement")
    print("6. Apply interest to all accounts")
    print("7. Show all accounts")
    print("8. Exit")


def run_bank_system():
    while True:
        show_menu()
        choice = input("Choose an option (1-8): ").strip()

        if choice == "1":
            create_account("savings")
        elif choice == "2":
            create_account("current")
        elif choice == "3":
            deposit_to_account()
        elif choice == "4":
            withdraw_from_account()
        elif choice == "5":
            show_statement()
        elif choice == "6":
            apply_interest_to_all()
        elif choice == "7":
            show_all_accounts()
        elif choice == "8":
            print("Exiting Clean Addis Bank System. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 8.")


if __name__ == "__main__":
    run_bank_system()
