"""
Day 6 - Intermediate: SOLID + Design Patterns
Covers: SRP + Dependency Injection, the Factory pattern, the
Observer pattern, and Interface Segregation.
"""

from abc import ABC, abstractmethod


# ------------------------------------------------------------------
# 1. Apply SRP + DIP
# ------------------------------------------------------------------
# Persistence and notifications are pulled out into their own classes
# behind simple interfaces, then "injected" into Account through its
# constructor - Account depends on abstractions, not concretions.
class Notifier(ABC):
    @abstractmethod
    def notify(self, message):
        pass


class EmailNotifier(Notifier):
    def notify(self, message):
        print(f"[Email] {message}")


class SMSNotifier(Notifier):
    def notify(self, message):
        print(f"[SMS] {message}")


class AccountRepository:
    """Handles persistence only - nothing else."""
    def save(self, account):
        print(f"[DB] Saved account #{account.account_number}, "
              f"balance {account.balance:.2f}")


class Account:
    """Does ONLY account-related logic: balance, deposit, withdraw."""
    def __init__(self, account_number, owner, balance,
                 repository: AccountRepository, notifier: Notifier):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        # Dependency injection: Account is handed its collaborators
        # rather than constructing them itself (this is the DIP fix).
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


repo = AccountRepository()
notifier = EmailNotifier()  # swap for SMSNotifier() with zero changes to Account
account = Account("3000", "Abel", 1000, repo, notifier)
account.deposit(200)
account.withdraw(150)

print("-" * 60)

# ------------------------------------------------------------------
# 2. Factory Pattern
# ------------------------------------------------------------------
class SavingsAccount(Account):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=0.05):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.interest_rate = interest_rate


class CurrentAccount(Account):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 overdraft_limit=500):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit


class FixedDepositAccount(SavingsAccount):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=0.10, lock_in_months=12):
        super().__init__(account_number, owner, balance, repository, notifier,
                          interest_rate)
        self.lock_in_months = lock_in_months


class AccountFactory:
    """Centralizes account creation, so client code never needs to
    know the concrete classes or their constructors directly."""

    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(number, owner, balance, repository, notifier)
        elif kind == "current":
            return CurrentAccount(number, owner, balance, repository, notifier)
        elif kind == "fixed":
            return FixedDepositAccount(number, owner, balance, repository, notifier)
        else:
            raise ValueError(f"Unknown account kind: {kind}")


new_account = AccountFactory.create("savings", "Marta", "3001", 500, repo, notifier)
print(f"Factory created a {type(new_account).__name__} for {new_account.owner}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Observer Pattern
# ------------------------------------------------------------------
class Observer(ABC):
    @abstractmethod
    def update(self, account, amount):
        pass


class SMSAlert(Observer):
    def update(self, account, amount):
        print(f"[SMS Alert] Large withdrawal of {amount:.2f} on account "
              f"#{account.account_number}!")


class AuditLog(Observer):
    def update(self, account, amount):
        print(f"[Audit Log] Withdrawal of {amount:.2f} recorded for "
              f"account #{account.account_number}.")


class ObservableAccount(Account):
    """Account with observer support - notifies observers on big withdrawals."""

    LARGE_WITHDRAWAL_THRESHOLD = 3000

    def __init__(self, account_number, owner, balance, repository, notifier):
        super().__init__(account_number, owner, balance, repository, notifier)
        self._observers = []

    def add_observer(self, observer: Observer):
        self._observers.append(observer)

    def withdraw(self, amount):
        super().withdraw(amount)
        if amount > self.LARGE_WITHDRAWAL_THRESHOLD:
            for observer in self._observers:
                observer.update(self, amount)


observable_account = ObservableAccount("3002", "Dawit", 10000, repo, notifier)
observable_account.add_observer(SMSAlert())
observable_account.add_observer(AuditLog())
observable_account.withdraw(5000)  # should trigger both observers

print("-" * 60)

# ------------------------------------------------------------------
# 4. Interface Segregation (ISP)
# ------------------------------------------------------------------
class InterestBearing(ABC):
    """A small, focused interface - only classes that actually earn
    interest need to implement it."""
    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccountISP(Account, InterestBearing):
    def __init__(self, account_number, owner, balance, repository, notifier,
                 interest_rate=0.05):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate


class CurrentAccountISP(Account):
    # CurrentAccount does NOT implement InterestBearing - it's never
    # forced to define a meaningless calculate_interest() method.
    def __init__(self, account_number, owner, balance, repository, notifier,
                 overdraft_limit=500):
        super().__init__(account_number, owner, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit


savings_isp = SavingsAccountISP("3003", "Hana", 1000, repo, notifier)
print(f"Interest earned: {savings_isp.calculate_interest():.2f}")

current_isp = CurrentAccountISP("3004", "Sara", 500, repo, notifier)
print(f"{current_isp.owner}'s current account has no calculate_interest() - "
      f"and that's correct, not a missing feature.")
