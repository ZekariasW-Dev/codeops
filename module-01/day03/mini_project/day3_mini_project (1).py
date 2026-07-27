"""
Day 3 - Full Program (Exercise 10): Inventory Manager

A menu-driven program that stores products and quantities in a
dictionary, and can save that dictionary to a file or load it back.
"""

INVENTORY_FILE = "inventory.txt"
inventory = {}  # e.g. {"Rice": 50, "Sugar": 20}


def add_product():
    """Adds a new product with a starting quantity to the inventory."""
    name = input("Enter product name: ").strip()
    try:
        quantity = int(input("Enter starting quantity: "))
    except ValueError:
        print("Invalid quantity. Please enter a whole number.")
        return

    if name in inventory:
        print(f"'{name}' already exists with quantity {inventory[name]}. "
              f"Use 'Update quantity' instead.")
    else:
        inventory[name] = quantity
        print(f"Added '{name}' with quantity {quantity}.")


def update_quantity():
    """Updates the quantity of an existing product."""
    name = input("Enter product name to update: ").strip()
    if name not in inventory:
        print(f"'{name}' was not found in the inventory.")
        return

    try:
        new_quantity = int(input(f"Enter new quantity for '{name}': "))
        inventory[name] = new_quantity
        print(f"'{name}' updated to quantity {new_quantity}.")
    except ValueError:
        print("Invalid quantity. Please enter a whole number.")


def view_products():
    """Prints every product currently in the inventory."""
    if not inventory:
        print("Inventory is empty.")
        return

    print("\n--- Current Inventory ---")
    for name, quantity in inventory.items():
        print(f"  {name:<15} -> {quantity}")
    print("--------------------------")


def save_to_file():
    """Saves the inventory dictionary to a text file."""
    with open(INVENTORY_FILE, "w") as file:
        for name, quantity in inventory.items():
            file.write(f"{name},{quantity}\n")
    print(f"Inventory saved to {INVENTORY_FILE}.")


def load_from_file():
    """Loads the inventory dictionary from a text file, if it exists."""
    global inventory
    try:
        with open(INVENTORY_FILE, "r") as file:
            lines = file.readlines()

        loaded_inventory = {}
        for line in lines:
            name, quantity = line.strip().split(",")
            loaded_inventory[name] = int(quantity)

        inventory = loaded_inventory
        print(f"Inventory loaded from {INVENTORY_FILE}.")

    except FileNotFoundError:
        print(f"{INVENTORY_FILE} does not exist yet. Save your inventory first.")


def show_menu():
    print("\n=== Inventory Manager ===")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")


def run_inventory_manager():
    while True:
        show_menu()
        choice = input("Choose an option (1-6): ").strip()

        if choice == "1":
            add_product()
        elif choice == "2":
            update_quantity()
        elif choice == "3":
            view_products()
        elif choice == "4":
            save_to_file()
        elif choice == "5":
            load_from_file()
        elif choice == "6":
            print("Exiting Inventory Manager. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 6.")


if __name__ == "__main__":
    run_inventory_manager()
