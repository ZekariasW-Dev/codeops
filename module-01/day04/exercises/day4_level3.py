"""
Day 4 - Level 3: Classes, Objects & Encapsulation (Advanced)
Covers: a full BankAccount class with getter/setter properties and
transfers, a small Library system, and a Car class with encapsulation.
"""


# ------------------------------------------------------------------
# 7. Full Bank Account with Properties
# ------------------------------------------------------------------
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        """Getter for balance."""
        return self.__balance

    @balance.setter
    def balance(self, new_balance):
        """Setter for balance - blocks negative balances from being set directly."""
        if new_balance < 0:
            print("Balance cannot be set to a negative value.")
        else:
            self.__balance = new_balance

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

    def transfer(self, to_account, amount):
        """Moves money from this account into another BankAccount."""
        if amount <= 0:
            print("Transfer amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds for transfer.")
        else:
            self.__balance -= amount
            to_account.deposit(amount)
            print(f"Transferred {amount:.2f} from {self.owner} to {to_account.owner}.")


# "Add, borrow & return" from the instructions maps to deposit/withdraw/transfer here.
acc1 = BankAccount("Abel", 1000)
acc2 = BankAccount("Sara", 500)

acc1.deposit(200)      # add funds
acc1.withdraw(150)     # borrow / take out funds
acc1.transfer(acc2, 300)  # return / move funds to another account

print(f"{acc1.owner}'s balance: {acc1.balance:.2f}")
print(f"{acc2.owner}'s balance: {acc2.balance:.2f}")

print("-" * 60)

# ------------------------------------------------------------------
# 8. Library System
# ------------------------------------------------------------------
class Book:
    def __init__(self, title, author, isbn, available=True):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = available


class Library:
    def __init__(self):
        self.__books = []  # private list of Book objects

    def add_book(self, book):
        self.__books.append(book)
        print(f"Added '{book.title}' to the library.")

    def borrow_book(self, isbn):
        for book in self.__books:
            if book.isbn == isbn:
                if book.available:
                    book.available = False
                    print(f"You borrowed '{book.title}'.")
                else:
                    print(f"'{book.title}' is already borrowed.")
                return
        print("No book found with that ISBN.")

    def return_book(self, isbn):
        for book in self.__books:
            if book.isbn == isbn:
                if not book.available:
                    book.available = True
                    print(f"You returned '{book.title}'.")
                else:
                    print(f"'{book.title}' was not borrowed.")
                return
        print("No book found with that ISBN.")


library = Library()
book1 = Book("Things Fall Apart", "Chinua Achebe", "ISBN-001")

library.add_book(book1)
library.borrow_book("ISBN-001")
library.borrow_book("ISBN-001")  # already borrowed
library.return_book("ISBN-001")

print("-" * 60)

# ------------------------------------------------------------------
# 9. Car Class with Encapsulation
# ------------------------------------------------------------------
class Car:
    def __init__(self, speed=0, fuel=100):
        self.__speed = speed
        self.__fuel = fuel

    @property
    def speed(self):
        return self.__speed

    @property
    def fuel(self):
        return self.__fuel

    def accelerate(self, amount=10):
        if self.__fuel <= 0:
            print("Cannot accelerate - out of fuel.")
            return
        self.__speed += amount
        self.__fuel = max(0, self.__fuel - 5)  # accelerating uses fuel
        print(f"Accelerated. Speed: {self.__speed}, Fuel: {self.__fuel}")

    def brake(self, amount=10):
        self.__speed = max(0, self.__speed - amount)
        print(f"Braked. Speed: {self.__speed}")

    def refuel(self, amount):
        self.__fuel = min(100, self.__fuel + amount)
        print(f"Refueled. Fuel: {self.__fuel}")


car = Car()
car.accelerate()
car.accelerate(20)
car.brake(15)
car.refuel(10)
print(f"Final speed: {car.speed}, Final fuel: {car.fuel}")
