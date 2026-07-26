"""
Day 2 Mini Project
Personal Finance Tracker

Features:
1. Add Income
2. Add Expense
3. Show Balance
4. Exit

Bonus:
- Display summary before exiting.
"""

# ==========================================
# Global Variables
# ==========================================

balance = 0.0
total_income = 0.0
total_expense = 0.0


# ==========================================
# Functions
# ==========================================

def add_income():
    """Add income to the balance."""
    global balance, total_income

    try:
        amount = float(input("Enter income amount: $"))

        if amount <= 0:
            print("Income must be greater than zero.\n")
            return

        balance += amount
        total_income += amount

        print(f"Income of ${amount:.2f} added successfully.\n")

    except ValueError:
        print("Invalid input. Please enter a numeric value.\n")


def add_expense():
    """Subtract expense from the balance."""
    global balance, total_expense

    try:
        amount = float(input("Enter expense amount: $"))

        if amount <= 0:
            print("Expense must be greater than zero.\n")
            return

        if amount > balance:
            print("Insufficient balance.\n")
            return

        balance -= amount
        total_expense += amount

        print(f"Expense of ${amount:.2f} recorded successfully.\n")

    except ValueError:
        print("Invalid input. Please enter a numeric value.\n")


def show_balance():
    """Display current balance."""

    print("\n========== Current Balance ==========")
    print(f"Current Balance: ${balance:.2f}\n")


def show_summary():
    """Display the final summary."""

    print("\n========== Daily Summary ==========")
    print(f"Total Income : ${total_income:.2f}")
    print(f"Total Expense: ${total_expense:.2f}")
    print(f"Final Balance: ${balance:.2f}")
    print("\nThank you for using the Personal Finance Tracker!")


# ==========================================
# Main Program
# ==========================================

while True:

    print("========== Personal Finance Tracker ==========")
    print("1. Add Income")
    print("2. Add Expense")
    print("3. Show Balance")
    print("4. Exit")

    choice = input("Choose an option (1-4): ")

    if choice == "1":
        add_income()

    elif choice == "2":
        add_expense()

    elif choice == "3":
        show_balance()

    elif choice == "4":
        show_summary()
        print("Program terminated.")
        break

    else:
        print("Invalid option. Please choose between 1 and 4.\n")