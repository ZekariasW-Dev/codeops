"""
Day 3 - Level 2: Collections Intermediate
Covers: list operations, dictionary operations, list comprehensions,
and importing a function from a separate module (utils.py).
"""

import utils  # exercise 7 - imports add_tax() from utils.py in this folder

# ------------------------------------------------------------------
# 4. List Operations
# ------------------------------------------------------------------
numbers = [10, 25, 40, 15, 60, 30]

print("Numbers greater than 30:")
for n in numbers:
    if n > 30:
        print(n, end=" ")
print()

sorted_numbers = sorted(numbers)  # sorted() returns a new list; keeps the original intact
print(f"Sorted list: {sorted_numbers}")

total = sum(numbers)
average = total / len(numbers)
print(f"Sum: {total}, Average: {average:.2f}")

print("-" * 60)

# ------------------------------------------------------------------
# 5. Dictionary Operations
# ------------------------------------------------------------------
products = {
    "Coffee": 150.00,
    "Notebook": 45.50,
    "Backpack": 890.00,
    "Headphones": 1200.00,
    "Water Bottle": 120.00,
}

print("Product Price List:")
for product, price in products.items():
    print(f"  {product:<15} -> {price:>8.2f} ETB")

search_name = input("\nEnter a product name to check its price: ")
price = products.get(search_name, "Sorry, that product was not found.")
print(f"Price for '{search_name}': {price}")

print("-" * 60)

# ------------------------------------------------------------------
# 6. List Comprehension
# ------------------------------------------------------------------
numbers_1_to_20 = [n for n in range(1, 21)]
print(f"Numbers 1-20: {numbers_1_to_20}")

even_numbers_1_to_30 = [n for n in range(1, 31) if n % 2 == 0]
print(f"Even numbers 1-30: {even_numbers_1_to_30}")

odd_numbers_1_to_10 = [n for n in range(1, 11) if n % 2 != 0]
print(f"Odd numbers 1-10: {odd_numbers_1_to_10}")

print("-" * 60)

# ------------------------------------------------------------------
# 7. Modules & Import
# ------------------------------------------------------------------
# add_tax() lives in utils.py; we imported the whole module above
# and call it as utils.add_tax(...).
price_before_tax = 200
price_with_tax = utils.add_tax(price_before_tax)
print(f"Price before tax: {price_before_tax}")
print(f"Price with default 15% tax: {price_with_tax:.2f}")

price_with_custom_tax = utils.add_tax(price_before_tax, rate=0.20)
print(f"Price with 20% tax: {price_with_custom_tax:.2f}")
