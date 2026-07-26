"""
Day 4 - Level 2: Classes, Objects & Encapsulation (Intermediate)
Covers: a Student class, a Product class, and adding encapsulation
to the Account class from Level 1.
"""


# ------------------------------------------------------------------
# 4. Student Class
# ------------------------------------------------------------------
class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average_grade(self):
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)


student = Student("Dawit", "STU-001")
student.add_grade(85)
student.add_grade(90)
student.add_grade(78)

print(f"{student.name}'s grades: {student.grades}")
print(f"{student.name}'s average grade: {student.average_grade():.2f}")

print("-" * 60)

# ------------------------------------------------------------------
# 5. Product Class
# ------------------------------------------------------------------
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def sell(self, quantity):
        """Reduces stock by quantity, but never lets it go negative."""
        if quantity > self.stock:
            print(f"Cannot sell {quantity} units - only {self.stock} in stock.")
        else:
            self.stock -= quantity
            print(f"Sold {quantity} units of {self.name}. Remaining stock: {self.stock}")

    def restock(self, quantity):
        self.stock += quantity
        print(f"Restocked {quantity} units of {self.name}. New stock: {self.stock}")


product = Product("Notebook", 45.50, 20)
product.sell(5)
product.sell(100)  # should be rejected - not enough stock
product.restock(10)

print("-" * 60)

# ------------------------------------------------------------------
# 6. Encapsulation Practice
# ------------------------------------------------------------------
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # private: name-mangled to _Account__balance

    @property
    def balance(self):
        """Read-only getter - there is no matching setter, so
        code outside the class cannot do account.balance = 999."""
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self.__balance += amount
        print(f"Deposited {amount:.2f}. New balance: {self.__balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance -= amount
            print(f"Withdrew {amount:.2f}. New balance: {self.__balance:.2f}")


account = Account("Marta", 1000)
account.deposit(500)
account.withdraw(300)
print(f"Balance via property: {account.balance:.2f}")

# account.balance = 99999  # this would raise AttributeError - no setter defined
