"""
Day 5 - Mini Project: Addis Bank System - Version 2

A menu-driven banking program built on an abstract Account hierarchy.
Supports creating Savings and Current accounts, deposits, withdrawals,
statements, applying interest to all savings accounts, and viewing
every account polymorphically.

Bonus: FixedDepositAccount inherits from SavingsAccount and adds a
lock-in period with a higher interest rate.
"""

from abc import ABC, abstractmethod


# ------------------------------------------------------------------
# Account hierarchy
# ------------------------------------------------------------------
class Account(ABC):
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return False
        self._balance += amount
        print(f"Deposited {amount:.2f}. New balance: {self._balance:.2f}")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False
        if amount > self._balance:
            print("Insufficient funds.")
            return False
        self._balance -= amount
        print(f"Withdrew {amount:.2f}. New balance: {self._balance:.2f}")
        return True

    def statement(self):
        print(f"[{self.__class__.__name__}] #{self.account_number} | "
              f"Owner: {self.owner} | Balance: {self._balance:.2f}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, account_number, owner, balance=0, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self._balance * self.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)
        print(f"Applied interest to account #{self.account_number}: +{interest:.2f}")

    def statement(self):
        print(f"[SavingsAccount] #{self.account_number} | Owner: {self.owner} | "
              f"Balance: {self._balance:.2f} | Interest Rate: {self.interest_rate * 100:.0f}%")


class CurrentAccount(Account):
    def __init__(self, account_number, owner, balance=0, overdraft_limit=500):
        super().__init__(account_number, owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False
        if amount > self._balance + self.overdraft_limit:
            print("Withdrawal exceeds available balance plus overdraft limit.")
            return False
        self._balance -= amount
        print(f"Withdrew {amount:.2f}. New balance: {self._balance:.2f}")
        return True

    def calculate_interest(self):
        return 0.0  # current accounts don't earn interest in this model

    def statement(self):
        print(f"[CurrentAccount] #{self.account_number} | Owner: {self.owner} | "
              f"Balance: {self._balance:.2f} | Overdraft Limit: {self.overdraft_limit:.2f}")


# ------------------------------------------------------------------
# Bonus: FixedDepositAccount inherits from SavingsAccount
# ------------------------------------------------------------------
class FixedDepositAccount(SavingsAccount):
    def __init__(self, account_number, owner, balance=0,
                 interest_rate=0.10, lock_in_months=12):
        # Fixed deposits usually pay a higher rate than regular savings.
        super().__init__(account_number, owner, balance, interest_rate)
        self.lock_in_months = lock_in_months

    def withdraw(self, amount):
        # Simplified rule: withdrawals aren't allowed during the lock-in period.
        print(f"Withdrawals are locked for {self.lock_in_months} months "
              f"on Fixed Deposit account #{self.account_number}.")
        return False

    def statement(self):
        print(f"[FixedDepositAccount] #{self.account_number} | Owner: {self.owner} | "
              f"Balance: {self._balance:.2f} | Interest Rate: {self.interest_rate * 100:.0f}% | "
              f"Lock-in: {self.lock_in_months} months")


# ------------------------------------------------------------------
# Menu-driven program
# ------------------------------------------------------------------
accounts = {}  # account_number (str) -> Account subclass instance
next_account_number = 2000


def create_savings_account():
    global next_account_number
    owner = input("Enter account owner's name: ").strip()
    try:
        balance = float(input("Enter starting balance (0 or more): "))
        if balance < 0:
            print("Starting balance cannot be negative.")
            return
        rate = float(input("Enter interest rate (e.g. 0.05 for 5%): "))
    except ValueError:
        print("Invalid number entered.")
        return

    account_number = str(next_account_number)
    next_account_number += 1
    accounts[account_number] = SavingsAccount(account_number, owner, balance, rate)
    print(f"Savings account created! Account number: {account_number}")


def create_current_account():
    global next_account_number
    owner = input("Enter account owner's name: ").strip()
    try:
        balance = float(input("Enter starting balance (0 or more): "))
        if balance < 0:
            print("Starting balance cannot be negative.")
            return
        overdraft_limit = float(input("Enter overdraft limit: "))
    except ValueError:
        print("Invalid number entered.")
        return

    account_number = str(next_account_number)
    next_account_number += 1
    accounts[account_number] = CurrentAccount(account_number, owner, balance, overdraft_limit)
    print(f"Current account created! Account number: {account_number}")


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


def apply_interest_to_all_savings():
    """Applies interest to every SavingsAccount (including FixedDepositAccount,
    since it inherits from SavingsAccount)."""
    applied_any = False
    for account in accounts.values():
        if isinstance(account, SavingsAccount):
            account.apply_interest()
            applied_any = True
    if not applied_any:
        print("No savings accounts to apply interest to.")


def show_all_accounts():
    """Polymorphism: every account type responds to statement() differently,
    even though we call the exact same method on all of them here."""
    if not accounts:
        print("No accounts exist yet.")
        return
    print("\n--- All Accounts ---")
    for account in accounts.values():
        account.statement()
    print("---------------------")


def show_menu():
    print("\n=== Addis Bank System - Version 2 ===")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Deposit")
    print("4. Withdraw")
    print("5. Show statement")
    print("6. Apply interest to all savings accounts")
    print("7. Show all accounts")
    print("8. Exit")


def run_bank_system():
    while True:
        show_menu()
        choice = input("Choose an option (1-8): ").strip()

        if choice == "1":
            create_savings_account()
        elif choice == "2":
            create_current_account()
        elif choice == "3":
            deposit_to_account()
        elif choice == "4":
            withdraw_from_account()
        elif choice == "5":
            show_statement()
        elif choice == "6":
            apply_interest_to_all_savings()
        elif choice == "7":
            show_all_accounts()
        elif choice == "8":
            print("Exiting Addis Bank System. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 8.")


if __name__ == "__main__":
    run_bank_system()
