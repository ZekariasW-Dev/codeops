"""
Day 6 - Basic: SOLID Principles
Covers: Single Responsibility, Open/Closed, Liskov Substitution,
and spotting SOLID violations in a code sample.
"""


# ------------------------------------------------------------------
# 1. Single Responsibility Principle (SRP)
# ------------------------------------------------------------------
# BEFORE (violates SRP): one class does salary math, file saving,
# AND email sending - three unrelated reasons to change.
#
# class Employee:
#     def __init__(self, name, hours, rate):
#         self.name = name
#         self.hours = hours
#         self.rate = rate
#
#     def calculate_salary(self):
#         return self.hours * self.rate
#
#     def save_to_file(self):
#         with open("employees.txt", "a") as f:
#             f.write(f"{self.name}: {self.calculate_salary()}\n")
#
#     def send_email(self):
#         print(f"Emailing payslip to {self.name}...")

# AFTER (follows SRP): each class has exactly one reason to change.
class Employee:
    """Only holds employee data. No calculation, no saving, no emailing."""
    def __init__(self, name, hours, rate):
        self.name = name
        self.hours = hours
        self.rate = rate


class SalaryCalculator:
    """Responsible only for salary math."""
    @staticmethod
    def calculate(employee):
        return employee.hours * employee.rate


class EmployeeRepository:
    """Responsible only for persistence (saving employee data)."""
    def __init__(self, filename="employees.txt"):
        self.filename = filename

    def save(self, employee, salary):
        with open(self.filename, "a") as file:
            file.write(f"{employee.name}: {salary:.2f}\n")


class EmailService:
    """Responsible only for sending notifications."""
    @staticmethod
    def send_payslip(employee, salary):
        print(f"Emailing payslip to {employee.name}: {salary:.2f}")


# Demo: each class does one job, and they cooperate.
employee = Employee("Selam", hours=160, rate=250)
salary = SalaryCalculator.calculate(employee)
EmployeeRepository().save(employee, salary)
EmailService.send_payslip(employee, salary)

print("-" * 60)

# ------------------------------------------------------------------
# 2. Open/Closed Principle (OCP)
# ------------------------------------------------------------------
# BEFORE (violates OCP): adding a new employee type means editing
# this function's if/elif chain every time.
def calculate_bonus(employee_type):
    if employee_type == "manager":
        return 5000
    elif employee_type == "developer":
        return 3000
    elif employee_type == "intern":
        return 500
    else:
        return 0


print(f"Old-style bonus for 'manager': {calculate_bonus('manager')}")

# AFTER (follows OCP): new employee types are added by creating a new
# class - calculate_bonus() itself never needs to change again.
class BonusStrategy:
    """Base 'interface' for bonus calculation strategies."""
    def get_bonus(self):
        raise NotImplementedError


class ManagerBonus(BonusStrategy):
    def get_bonus(self):
        return 5000


class DeveloperBonus(BonusStrategy):
    def get_bonus(self):
        return 3000


class InternBonus(BonusStrategy):
    def get_bonus(self):
        return 500


# Adding, say, "TeamLeadBonus" later requires zero changes below.
def calculate_bonus_v2(strategy: BonusStrategy):
    return strategy.get_bonus()


print(f"New-style bonus for manager: {calculate_bonus_v2(ManagerBonus())}")
print(f"New-style bonus for developer: {calculate_bonus_v2(DeveloperBonus())}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Liskov Substitution Principle (LSP)
# ------------------------------------------------------------------
# BEFORE (violates LSP): Penguin inherits fly() from Bird but can't
# actually fly, so make_bird_fly(Penguin()) would crash or lie.
#
# class Bird:
#     def fly(self):
#         print("Flying!")
#
# class Penguin(Bird):
#     def fly(self):
#         raise Exception("Penguins can't fly!")   # breaks substitutability

# AFTER (follows LSP): flight is pulled out into its own capability.
# Any object substituted into make_bird_fly() is guaranteed to
# actually support flying, because only flying birds have fly().
class Bird:
    """Base class - every bird can do bird things, but not necessarily fly."""
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")


class FlyingBird(Bird):
    """Only birds that can truly fly inherit from this."""
    def fly(self):
        print(f"{self.name} is flying!")


class Penguin(Bird):
    """Penguin is a Bird, but NOT a FlyingBird - honest about its abilities."""
    def swim(self):
        print(f"{self.name} is swimming.")


def make_bird_fly(bird: FlyingBird):
    # Only ever called with FlyingBird instances, so this never breaks.
    bird.fly()


sparrow = FlyingBird("Sparrow")
penguin = Penguin("Pingu")

make_bird_fly(sparrow)   # works fine
# make_bird_fly(penguin)  # would be a type mismatch, not a runtime crash -
                          # exactly what LSP is meant to prevent.
penguin.swim()

print("-" * 60)

# ------------------------------------------------------------------
# 4. Identify SOLID Violations
# ------------------------------------------------------------------
# The sample code:
#
# class Account:
#     def __init__(self):
#         self.notifier = EmailNotifier()
#         ...
#     def withdraw(self, amount): ...
#         self.notifier.send_email(...)
#         self.save_to_db(...)
#
# Violations:
# - SRP (Single Responsibility): Account handles balance logic,
#   notifications, AND database persistence - three separate reasons
#   for this class to change.
# - DIP (Dependency Inversion): Account creates its own concrete
#   EmailNotifier inside __init__ ("self.notifier = EmailNotifier()").
#   It depends directly on a concrete class instead of an abstraction,
#   so you can't swap in an SMSNotifier or a mock for testing without
#   editing Account itself.
print("Violations in the sample Account class: SRP and DIP.")
print("See the comments above this line for the full explanation.")
