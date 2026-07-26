"""
Day 5 - Level 1: Inheritance Basics
Covers: a Vehicle parent class with Car/Motorcycle children, and
extending the Day 4 Account class with SavingsAccount & CurrentAccount.
"""


# ------------------------------------------------------------------
# 1. Simple Inheritance
# ------------------------------------------------------------------
class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(f"{self.year} {self.name} {self.model}")


class Car(Vehicle):
    def __init__(self, name, model, year, num_doors):
        super().__init__(name, model, year)
        self.num_doors = num_doors  # unique attribute

    def open_trunk(self):  # unique method
        print(f"The trunk of the {self.name} is now open.")


class Motorcycle(Vehicle):
    def __init__(self, name, model, year, has_sidecar):
        super().__init__(name, model, year)
        self.has_sidecar = has_sidecar  # unique attribute

    def wheelie(self):  # unique method
        print(f"The {self.name} pops a wheelie!")


car = Car("Toyota", "Corolla", 2022, num_doors=4)
motorcycle = Motorcycle("Yamaha", "MT-07", 2021, has_sidecar=False)

car.info()
car.open_trunk()

motorcycle.info()
motorcycle.wheelie()

print("-" * 60)

# ------------------------------------------------------------------
# Base Account class (from Day 4), used by exercises 2 and 3.
# ------------------------------------------------------------------
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        # Protected (single underscore) rather than private here, so
        # child classes below can access it directly via self._balance.
        self._balance = balance

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


# ------------------------------------------------------------------
# 2. SavingsAccount Inheritance
# ------------------------------------------------------------------
class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate
        self.deposit(interest)
        print(f"Interest added at {self.interest_rate * 100:.0f}%: +{interest:.2f}")


savings = SavingsAccount("Hana", 1000, interest_rate=0.05)
savings.add_interest()

print("-" * 60)

# ------------------------------------------------------------------
# 3. CurrentAccount Inheritance
# ------------------------------------------------------------------
class CurrentAccount(Account):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        """Overridden to allow the balance to go negative, up to overdraft_limit."""
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return
        if amount > self._balance + self.overdraft_limit:
            print("Withdrawal exceeds available balance plus overdraft limit.")
        else:
            self._balance -= amount
            print(f"Withdrew {amount:.2f}. New balance: {self._balance:.2f} "
                  f"(overdraft limit: {self.overdraft_limit:.2f})")


current = CurrentAccount("Dawit", 200, overdraft_limit=500)
current.withdraw(600)   # dips into overdraft, allowed
current.withdraw(200)   # exceeds balance + overdraft, rejected
