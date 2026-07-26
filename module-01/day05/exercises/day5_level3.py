"""
Day 5 - Level 3: Full Account Hierarchy (Advanced)
The polished, final version of the account hierarchy: Account is
abstract, both subclasses call super().__init__(), and properties
are used wherever a value needs read access (and controlled write
access) from outside the class.
"""

from abc import ABC, abstractmethod


class Account(ABC):
    """Abstract base class - cannot be instantiated on its own."""

    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # protected: subclasses can read/write it

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance += amount
        print(f"Deposited {amount:.2f}. New balance: {self._balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance -= amount
            print(f"Withdrew {amount:.2f}. New balance: {self._balance:.2f}")

    def statement(self):
        print(f"[{self.__class__.__name__}] Owner: {self.owner}, "
              f"Balance: {self._balance:.2f}")

    @abstractmethod
    def calculate_interest(self):
        """Each concrete account type defines its own interest rule."""
        pass


class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self._interest_rate = interest_rate

    @property
    def interest_rate(self):
        return self._interest_rate

    @interest_rate.setter
    def interest_rate(self, new_rate):
        if new_rate < 0:
            print("Interest rate cannot be negative.")
        else:
            self._interest_rate = new_rate

    def calculate_interest(self):
        return self._balance * self._interest_rate

    def statement(self):
        print(f"[SavingsAccount] Owner: {self.owner}, Balance: {self._balance:.2f}, "
              f"Interest Rate: {self._interest_rate * 100:.0f}%")


class CurrentAccount(Account):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self._overdraft_limit = overdraft_limit

    @property
    def overdraft_limit(self):
        return self._overdraft_limit

    @overdraft_limit.setter
    def overdraft_limit(self, new_limit):
        if new_limit < 0:
            print("Overdraft limit cannot be negative.")
        else:
            self._overdraft_limit = new_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance + self._overdraft_limit:
            print("Withdrawal exceeds available balance plus overdraft limit.")
        else:
            self._balance -= amount
            print(f"Withdrew {amount:.2f}. New balance: {self._balance:.2f}")

    def calculate_interest(self):
        # Current accounts don't earn interest in this model.
        return 0.0

    def statement(self):
        print(f"[CurrentAccount] Owner: {self.owner}, Balance: {self._balance:.2f}, "
              f"Overdraft Limit: {self._overdraft_limit:.2f}")


if __name__ == "__main__":
    savings = SavingsAccount("Hana", 1000, interest_rate=0.05)
    current = CurrentAccount("Dawit", 200, overdraft_limit=500)

    for account in (savings, current):
        account.statement()
        account.deposit(100)
        print(f"Interest/earnings this period: {account.calculate_interest():.2f}")
        print()

    # Using the property setters:
    savings.interest_rate = 0.07
    current.overdraft_limit = 1000
    print(f"Updated savings interest rate: {savings.interest_rate * 100:.0f}%")
    print(f"Updated overdraft limit: {current.overdraft_limit:.2f}")
