"""
Day 4 - Mini Project (Capstone): Addis Bank Account System (Version 1)

A menu-driven banking program. Accounts are stored in a dictionary
keyed by account number. Includes full encapsulation and validation.

Bonus: a SavingsAccount subclass that inherits from BankAccount and
adds interest - a preview of inheritance for Day 5.
"""


class BankAccount:
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
        self.owner = owner
        self.__balance = balance  # private balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return False
        self.__balance += amount
        print(f"Deposited {amount:.2f}. New balance: {self.__balance:.2f}")
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False
        if amount > self.__balance:
            print("Insufficient funds.")
            return False
        self.__balance -= amount
        print(f"Withdrew {amount:.2f}. New balance: {self.__balance:.2f}")
        return True

    def info(self):
        return (f"Account #{self.account_number} | Owner: {self.owner} | "
                f"Balance: {self.balance:.2f} | Type: {self.__class__.__name__}")


# ------------------------------------------------------------------
# Bonus: SavingsAccount inherits from BankAccount (preview of Day 5)
# ------------------------------------------------------------------
class SavingsAccount(BankAccount):
    def __init__(self, account_number, owner, balance=0, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        print(f"Applied {self.interest_rate * 100:.0f}% interest: +{interest:.2f}")


# ------------------------------------------------------------------
# Menu-driven program
# ------------------------------------------------------------------
accounts = {}  # account_number (str) -> BankAccount or SavingsAccount object
next_account_number = 1000  # simple auto-incrementing account number


def create_account():
    global next_account_number
    owner = input("Enter account owner's name: ").strip()

    try:
        starting_balance = float(input("Enter starting balance (0 or more): "))
        if starting_balance < 0:
            print("Starting balance cannot be negative.")
            return
    except ValueError:
        print("Invalid amount entered.")
        return

    is_savings = input("Is this a savings account? (y/n): ").strip().lower() == "y"
    account_number = str(next_account_number)
    next_account_number += 1

    if is_savings:
        account = SavingsAccount(account_number, owner, starting_balance)
    else:
        account = BankAccount(account_number, owner, starting_balance)

    accounts[account_number] = account
    print(f"Account created! Account number: {account_number}")


def get_account():
    """Helper: prompts for an account number and returns the matching account, or None."""
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


def check_balance():
    account = get_account()
    if account is None:
        return
    print(f"Balance: {account.balance:.2f}")


def view_account_info():
    account = get_account()
    if account is None:
        return
    print(account.info())


def show_menu():
    print("\n=== Addis Bank Account System ===")
    print("1. Create new account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Check balance")
    print("5. View account info")
    print("6. Exit")


def run_bank_system():
    while True:
        show_menu()
        choice = input("Choose an option (1-6): ").strip()

        if choice == "1":
            create_account()
        elif choice == "2":
            deposit_to_account()
        elif choice == "3":
            withdraw_from_account()
        elif choice == "4":
            check_balance()
        elif choice == "5":
            view_account_info()
        elif choice == "6":
            print("Exiting Addis Bank Account System. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 6.")


if __name__ == "__main__":
    run_bank_system()
