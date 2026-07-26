"""
Day 7 - Mini Project: Bank Customer Service Simulator

A menu-driven console program that uses two linear data structures:
  - Stack (list-backed): transaction history, so the most recent
    transaction can be undone (LIFO matches "undo" perfectly).
  - Dictionary: customers keyed by account number, for O(1) average
    lookup instead of scanning a list.
"""


class Stack:
    """push/pop/peek are all O(1) amortized - a plain Python list
    already behaves like a stack when you only touch the end of it."""
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)  # O(1) amortized

    def pop(self):
        if not self._items:
            return None
        return self._items.pop()  # O(1) - removes from the end

    def peek(self):
        if not self._items:
            return None
        return self._items[-1]  # O(1)

    def is_empty(self):
        return len(self._items) == 0

    def show_all(self):
        return list(reversed(self._items))  # most recent first


# Dictionary: account_number (str) -> customer info dict.
# O(1) average lookup by key, vs O(n) if this were a list we had to
# scan through looking for a matching account number.
customers = {
    "1001": {"name": "Abel", "balance": 5000},
    "1002": {"name": "Sara", "balance": 3200},
    "1003": {"name": "Marta", "balance": 7800},
}

transaction_history = Stack()


def make_transaction():
    account_number = input("Enter account number: ").strip()
    customer = customers.get(account_number)  # O(1) average lookup
    if customer is None:
        print("No customer found with that account number.")
        return

    action = input("Transaction type - deposit (d) or withdraw (w): ").strip().lower()
    try:
        amount = float(input("Enter amount: "))
        if amount <= 0:
            print("Amount must be positive.")
            return
    except ValueError:
        print("Invalid amount entered.")
        return

    if action == "d":
        customer["balance"] += amount
        transaction_history.push({
            "account_number": account_number, "type": "deposit", "amount": amount
        })
        print(f"Deposited {amount:.2f}. New balance: {customer['balance']:.2f}")

    elif action == "w":
        if amount > customer["balance"]:
            print("Insufficient funds.")
            return
        customer["balance"] -= amount
        transaction_history.push({
            "account_number": account_number, "type": "withdraw", "amount": amount
        })
        print(f"Withdrew {amount:.2f}. New balance: {customer['balance']:.2f}")

    else:
        print("Unknown transaction type. Use 'd' for deposit or 'w' for withdraw.")


def undo_last_transaction():
    """Pops the most recent transaction (O(1)) and reverses its effect."""
    last_transaction = transaction_history.pop()
    if last_transaction is None:
        print("No transactions to undo.")
        return

    customer = customers.get(last_transaction["account_number"])
    if customer is None:
        print("Customer for that transaction no longer exists.")
        return

    if last_transaction["type"] == "deposit":
        customer["balance"] -= last_transaction["amount"]
        print(f"Undid deposit of {last_transaction['amount']:.2f} for "
              f"account #{last_transaction['account_number']}. "
              f"New balance: {customer['balance']:.2f}")
    else:  # withdraw
        customer["balance"] += last_transaction["amount"]
        print(f"Undid withdrawal of {last_transaction['amount']:.2f} for "
              f"account #{last_transaction['account_number']}. "
              f"New balance: {customer['balance']:.2f}")


def search_customer():
    """O(1) average - straight dictionary lookup, no scanning needed."""
    account_number = input("Enter account number to search: ").strip()
    customer = customers.get(account_number)
    if customer is None:
        print("No customer found with that account number.")
    else:
        print(f"Account #{account_number}: {customer['name']}, "
              f"Balance: {customer['balance']:.2f}")


def show_menu():
    print("\n=== Addis Bank Customer Service Simulator ===")
    print("1. Make a transaction")
    print("2. Undo last transaction")
    print("3. Search customer by account number")
    print("4. Exit")


def run_simulator():
    while True:
        show_menu()
        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            make_transaction()
        elif choice == "2":
            undo_last_transaction()
        elif choice == "3":
            search_customer()
        elif choice == "4":
            print("Exiting Bank Customer Service Simulator. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 4.")


if __name__ == "__main__":
    run_simulator()
