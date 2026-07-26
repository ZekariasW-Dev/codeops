"""
Day 5 - Level 2: Inheritance Intermediate
Covers: overriding statement(), polymorphism across account types,
and converting Account into an abstract base class.
"""

from abc import ABC, abstractmethod


# ------------------------------------------------------------------
# 4 & 5. Method Overriding + Polymorphism
# (Account is still a normal, concrete class at this point.)
# ------------------------------------------------------------------
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance -= amount

    def statement(self):
        print(f"[Account] Owner: {self.owner}, Balance: {self._balance:.2f}")


class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def statement(self):  # 4. overridden to show interest rate
        print(f"[SavingsAccount] Owner: {self.owner}, Balance: {self._balance:.2f}, "
              f"Interest Rate: {self.interest_rate * 100:.0f}%")


class CurrentAccount(Account):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance + self.overdraft_limit:
            print("Withdrawal exceeds available balance plus overdraft limit.")
        else:
            self._balance -= amount

    def statement(self):  # 4. overridden to show overdraft info
        print(f"[CurrentAccount] Owner: {self.owner}, Balance: {self._balance:.2f}, "
              f"Overdraft Limit: {self.overdraft_limit:.2f}")


# 5. Polymorphism: one list, three different account types.
# Calling the same method name (statement / deposit) behaves
# differently depending on the actual object's class.
accounts = [
    Account("Generic Owner", 100),
    SavingsAccount("Hana", 1000, interest_rate=0.05),
    CurrentAccount("Dawit", 200, overdraft_limit=500),
]

print("--- Polymorphism demo ---")
for acc in accounts:
    acc.statement()
    acc.deposit(100)
    acc.statement()
    print()

print("-" * 60)

# ------------------------------------------------------------------
# 6. Abstract Base Class
# ------------------------------------------------------------------
# We now formalize the hierarchy: Account becomes abstract, so it can
# no longer be instantiated directly. Every subclass MUST implement
# calculate_interest(), or Python will refuse to create it too.
class AbstractAccount(ABC):
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance -= amount

    def statement(self):
        print(f"[Account] Owner: {self.owner}, Balance: {self._balance:.2f}")

    @abstractmethod
    def calculate_interest(self):
        """Every concrete subclass must define how it calculates interest."""
        pass


class AbstractSavingsAccount(AbstractAccount):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self._balance * self.interest_rate


class AbstractCurrentAccount(AbstractAccount):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def calculate_interest(self):
        # Current accounts typically don't earn interest.
        return 0.0


print("--- Abstract Base Class demo ---")

# This line would raise: TypeError: Can't instantiate abstract class
# AbstractAccount with abstract method calculate_interest
try:
    AbstractAccount("Someone", 100)
except TypeError as error:
    print(f"As expected, Account can't be instantiated directly: {error}")

abs_savings = AbstractSavingsAccount("Hana", 1000)
abs_current = AbstractCurrentAccount("Dawit", 200)

print(f"Savings interest: {abs_savings.calculate_interest():.2f}")
print(f"Current interest: {abs_current.calculate_interest():.2f}")
