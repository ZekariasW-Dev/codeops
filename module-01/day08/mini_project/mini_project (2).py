"""
Day 8 - Mini Project: Bank Transaction Analyzer

A menu-driven console app for Addis Bank that stores transactions and
demonstrates recursion (total balance, threshold reports), sorting
(by amount or date), and searching (linear on unsorted data, binary
after sorting).
"""

from datetime import datetime

# Each transaction is a dict: {"amount": float, "date": "YYYY-MM-DD", "type": "deposit"/"withdraw"}
transactions = [
    {"amount": 500.0, "date": "2026-01-05", "type": "deposit"},
    {"amount": 200.0, "date": "2026-02-14", "type": "withdraw"},
    {"amount": 1200.0, "date": "2026-01-20", "type": "deposit"},
    {"amount": 50.0, "date": "2026-03-01", "type": "withdraw"},
    {"amount": 800.0, "date": "2026-02-28", "type": "deposit"},
]


# ------------------------------------------------------------------
# Recursive total balance
# ------------------------------------------------------------------
def calculate_total_balance(transaction_list, index=0):
    """
    Recursively sums transactions - deposits add to the balance,
    withdrawals subtract. Base case: reaching the end of the list.
    """
    if index == len(transaction_list):
        return 0

    current = transaction_list[index]
    amount = current["amount"] if current["type"] == "deposit" else -current["amount"]
    return amount + calculate_total_balance(transaction_list, index + 1)


# ------------------------------------------------------------------
# Sorting - Insertion Sort
# ------------------------------------------------------------------
# Insertion sort is a good fit here: transactions are usually added
# one at a time and are often "nearly sorted" already (e.g. mostly by
# date), and insertion sort performs close to O(n) on nearly-sorted
# data, versus O(n^2) for a naive approach like bubble sort in the
# worst case with no early-exit.
def sort_transactions(transaction_list, key):
    """key is 'amount' or 'date' - sorts a COPY, doesn't mutate the original."""
    array = transaction_list.copy()

    for i in range(1, len(array)):
        current = array[i]
        j = i - 1
        while j >= 0 and array[j][key] > current[key]:
            array[j + 1] = array[j]
            j -= 1
        array[j + 1] = current

    return array


# ------------------------------------------------------------------
# Searching
# ------------------------------------------------------------------
def linear_search_by_amount(transaction_list, target_amount):
    """O(n) - works on unsorted data, checks every transaction in order."""
    for index, transaction in enumerate(transaction_list):
        if transaction["amount"] == target_amount:
            return index
    return -1


def binary_search_by_amount(sorted_transaction_list, target_amount):
    """O(log n) - REQUIRES the list to already be sorted by amount."""
    low, high = 0, len(sorted_transaction_list) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_amount = sorted_transaction_list[mid]["amount"]
        if mid_amount == target_amount:
            return mid
        elif mid_amount < target_amount:
            low = mid + 1
        else:
            high = mid - 1

    return -1


# ------------------------------------------------------------------
# Bonus: recursive report generation
# ------------------------------------------------------------------
def generate_report_above_threshold(transaction_list, threshold, index=0):
    """
    Recursively builds a list of transactions with amount > threshold.
    Base case: reaching the end returns an empty list; each recursive
    step either includes the current transaction or skips it.
    """
    if index == len(transaction_list):
        return []

    rest_of_report = generate_report_above_threshold(transaction_list, threshold, index + 1)
    current = transaction_list[index]

    if current["amount"] > threshold:
        return [current] + rest_of_report
    return rest_of_report


# ------------------------------------------------------------------
# Menu-driven program
# ------------------------------------------------------------------
def add_transaction():
    try:
        amount = float(input("Enter transaction amount: "))
        if amount <= 0:
            print("Amount must be positive.")
            return
        date_str = input("Enter date (YYYY-MM-DD): ").strip()
        datetime.strptime(date_str, "%Y-%m-%d")  # validates the format
    except ValueError:
        print("Invalid amount or date format.")
        return

    transaction_type = input("Type - deposit (d) or withdraw (w): ").strip().lower()
    if transaction_type not in ("d", "w"):
        print("Unknown type. Use 'd' or 'w'.")
        return

    transactions.append({
        "amount": amount,
        "date": date_str,
        "type": "deposit" if transaction_type == "d" else "withdraw",
    })
    print("Transaction added.")


def show_total_balance():
    total = calculate_total_balance(transactions)
    print(f"Total balance (via recursion): {total:.2f}")


def show_sorted_transactions():
    key = input("Sort by 'amount' or 'date': ").strip().lower()
    if key not in ("amount", "date"):
        print("Please choose 'amount' or 'date'.")
        return
    sorted_list = sort_transactions(transactions, key)
    print(f"\n--- Transactions sorted by {key} ---")
    for transaction in sorted_list:
        print(f"  {transaction['date']} | {transaction['type']:<8} | "
              f"{transaction['amount']:.2f}")


def search_transaction():
    try:
        target_amount = float(input("Enter amount to search for: "))
    except ValueError:
        print("Invalid amount.")
        return

    method = input("Search method - linear (l) or binary (b): ").strip().lower()

    if method == "l":
        transactions_ref = transactions
        index = linear_search_by_amount(transactions, target_amount)
    elif method == "b":
        transactions_ref = sort_transactions(transactions, "amount")
        index = binary_search_by_amount(transactions_ref, target_amount)
    else:
        print("Unknown method. Use 'l' or 'b'.")
        return

    if index == -1:
        print("Transaction not found.")
    else:
        found = transactions_ref[index]
        print(f"Found: {found['date']} | {found['type']} | {found['amount']:.2f}")


def show_report():
    try:
        threshold = float(input("Show transactions above what amount? "))
    except ValueError:
        print("Invalid amount.")
        return

    report = generate_report_above_threshold(transactions, threshold)
    if not report:
        print(f"No transactions above {threshold:.2f}.")
        return

    print(f"\n--- Transactions above {threshold:.2f} ---")
    for transaction in report:
        print(f"  {transaction['date']} | {transaction['type']:<8} | "
              f"{transaction['amount']:.2f}")


def show_all_transactions():
    print("\n--- All Transactions ---")
    for transaction in transactions:
        print(f"  {transaction['date']} | {transaction['type']:<8} | "
              f"{transaction['amount']:.2f}")


def show_menu():
    print("\n=== Addis Bank Transaction Analyzer ===")
    print("1. Add transaction")
    print("2. Show total balance (recursive)")
    print("3. Show sorted transactions")
    print("4. Search for a transaction")
    print("5. Generate report (transactions above threshold)")
    print("6. Show all transactions")
    print("7. Exit")


def run_analyzer():
    while True:
        show_menu()
        choice = input("Choose an option (1-7): ").strip()

        if choice == "1":
            add_transaction()
        elif choice == "2":
            show_total_balance()
        elif choice == "3":
            show_sorted_transactions()
        elif choice == "4":
            search_transaction()
        elif choice == "5":
            show_report()
        elif choice == "6":
            show_all_transactions()
        elif choice == "7":
            print("Exiting Transaction Analyzer. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 7.")


if __name__ == "__main__":
    run_analyzer()
