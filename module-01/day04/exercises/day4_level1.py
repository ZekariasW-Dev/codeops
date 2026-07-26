"""
Day 4 - Level 1: Classes, Objects & Encapsulation (Basic)
Covers: a simple Person class, a Rectangle class, and a basic
bank Account class.
"""


# ------------------------------------------------------------------
# 1. Simple Class - Person
# ------------------------------------------------------------------
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        """Prints a greeting using this person's name and age."""
        print(f"Hi, I'm {self.name} and I'm {self.age} years old.")


person1 = Person("Abel", 24)
person2 = Person("Sara", 30)

person1.introduce()
person2.introduce()

print("-" * 60)

# ------------------------------------------------------------------
# 2. Rectangle Class
# ------------------------------------------------------------------
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)


rect1 = Rectangle(5, 3)
rect2 = Rectangle(10, 4)

print(f"Rectangle 1 -> area: {rect1.area()}, perimeter: {rect1.perimeter()}")
print(f"Rectangle 2 -> area: {rect2.area()}, perimeter: {rect2.perimeter()}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Bank Account (Basic)
# ------------------------------------------------------------------
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount:.2f}. New balance: {self.balance:.2f}")

    def withdraw(self, amount):
        # Basic version - Level 2 will add stricter validation.
        if amount > self.balance:
            print("Insufficient funds.")
        else:
            self.balance -= amount
            print(f"Withdrew {amount:.2f}. New balance: {self.balance:.2f}")


account = Account("Marta", 1000)
account.deposit(500)
account.withdraw(300)
account.withdraw(5000)  # should print "Insufficient funds."
