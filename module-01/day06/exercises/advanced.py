"""
Day 6 - Advanced: Full SOLID Refactoring & Combined Patterns
Covers: refactoring a "god class", combining Factory + Observer +
Singleton, and proving the design is open for extension (OCP).
"""

from abc import ABC, abstractmethod


# ------------------------------------------------------------------
# 9. Full SOLID Refactoring
# ------------------------------------------------------------------
# BEFORE: a "god class" that does everything - balance logic,
# interest calculation, persistence, notifications, AND printing.
# It violates SRP (many reasons to change), OCP (must edit the class
# to add account types or notification channels), and DIP (creates
# its own concrete dependencies).
#
# class GodAccount:
#     def __init__(self, owner, balance, kind):
#         self.owner = owner
#         self.balance = balance
#         self.kind = kind
#
#     def withdraw(self, amount):
#         self.balance -= amount
#         # persistence baked in
#         with open("accounts.txt", "a") as f:
#             f.write(f"{self.owner}: {self.balance}\n")
#         # notification baked in
#         print(f"Emailing {self.owner} about withdrawal...")
#         # interest logic baked in, with type-checking if/elif
#         if self.kind == "savings":
#             self.balance += self.balance * 0.05

# AFTER: each responsibility is its own small class, wired together
# through interfaces (ABCs) rather than hard-coded concrete types.
class Notifier(ABC):
    @abstractmethod
    def notify(self, message):
        pass


class EmailNotifier(Notifier):
    def notify(self, message):
        print(f"[Email] {message}")


class Repository(ABC):
    @abstractmethod
    def save(self, account):
        pass


class FileRepository(Repository):
    def save(self, account):
        print(f"[File] Saved account #{account.account_number}, "
              f"balance {account.balance:.2f}")


class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self):
        pass


class Account(ABC):
    """Only handles balance logic now - one reason to change."""
    def __init__(self, account_number, owner, balance,
                 repository: Repository, notifier: Notifier):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self._repository = repository
        self._notifier = notifier

    def deposit(self, amount):
        self.balance += amount
        self._repository.save(self)
        self._notifier.notify(f"{self.owner} deposited {amount:.2f}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds.")
            return
        self.balance -= amount
        self._repository.save(self)
        self._notifier.notify(f"{self.owner} withdrew {amount:.2f}")


class SavingsAccount(Account, InterestBearing):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=0.05):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate


class CurrentAccount(Account):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 overdraft_limit=500):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit


repo = FileRepository()
notifier = EmailNotifier()
refactored_savings = SavingsAccount("4000", "Hana", 1000, repo, notifier)
refactored_savings.deposit(100)
print(f"Interest: {refactored_savings.calculate_interest():.2f}")

print("-" * 60)

# ------------------------------------------------------------------
# 10. Combine Factory + Observer + Singleton
# ------------------------------------------------------------------
class BankConfig:
    """Singleton - only one BankConfig ever exists, so every part of
    the system sees the same interest rate / overdraft limit."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.default_interest_rate = 0.05
            cls._instance.default_overdraft_limit = 500
        return cls._instance


class Observer(ABC):
    @abstractmethod
    def update(self, account, amount):
        pass


class SMSAlert(Observer):
    def update(self, account, amount):
        print(f"[SMS Alert] Large transaction of {amount:.2f} on "
              f"account #{account.account_number}!")


class AuditLog(Observer):
    def update(self, account, amount):
        print(f"[Audit Log] Transaction of {amount:.2f} recorded for "
              f"account #{account.account_number}.")


class ObservableAccount(Account):
    LARGE_TRANSACTION_THRESHOLD = 3000

    def __init__(self, account_number, owner, balance, repository, notifier):
        super().__init__(account_number, owner, balance, repository, notifier)
        self._observers = []

    def add_observer(self, observer: Observer):
        self._observers.append(observer)

    def _alert_if_large(self, amount):
        if amount > self.LARGE_TRANSACTION_THRESHOLD:
            for observer in self._observers:
                observer.update(self, amount)

    def withdraw(self, amount):
        super().withdraw(amount)
        self._alert_if_large(amount)


class ObservableSavingsAccount(ObservableAccount, InterestBearing):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=None):
        super().__init__(account_number, owner, balance, repository, notifier)
        # Falls back to the bank-wide default from the Singleton config.
        self.interest_rate = interest_rate or BankConfig().default_interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate


class ObservableCurrentAccount(ObservableAccount):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 overdraft_limit=None):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit or BankConfig().default_overdraft_limit


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        kind = kind.lower()
        if kind == "savings":
            account = ObservableSavingsAccount(number, owner, balance, repository, notifier)
        elif kind == "current":
            account = ObservableCurrentAccount(number, owner, balance, repository, notifier)
        else:
            raise ValueError(f"Unknown account kind: {kind}")

        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())
        return account


config_a = BankConfig()
config_b = BankConfig()
print(f"Same Singleton instance? {config_a is config_b}")  # True

combo_account = AccountFactory.create("savings", "Dawit", "4001", 10000, repo, notifier)
combo_account.withdraw(5000)  # triggers SMSAlert + AuditLog via Observer

print("-" * 60)

# ------------------------------------------------------------------
# 11. Refactoring Challenge - add InvestmentAccount
# ------------------------------------------------------------------
# Because AccountFactory and Account are built around OCP, adding a
# brand-new account type means writing ONE new class and adding ONE
# branch to the factory - nothing else in the system changes.
class ObservableInvestmentAccount(ObservableAccount, InterestBearing):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 expected_return_rate=0.12):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.expected_return_rate = expected_return_rate

    def calculate_interest(self):
        return self.balance * self.expected_return_rate


class ExtendedAccountFactory(AccountFactory):
    """Extends the factory to also produce InvestmentAccounts, without
    touching the original AccountFactory or Account classes at all."""
    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        if kind.lower() == "investment":
            account = ObservableInvestmentAccount(number, owner, balance, repository, notifier)
            account.add_observer(SMSAlert())
            account.add_observer(AuditLog())
            return account
        return AccountFactory.create(kind, owner, number, balance, repository, notifier)


investment_account = ExtendedAccountFactory.create(
    "investment", "Sara", "4002", 20000, repo, notifier
)
print(f"Created {type(investment_account).__name__} for {investment_account.owner}")
print(f"Expected return: {investment_account.calculate_interest():.2f}")
