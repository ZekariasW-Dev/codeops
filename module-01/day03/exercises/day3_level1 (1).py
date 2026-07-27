"""
Day 3 - Level 1: Collections Basics
Covers: lists & tuples, dictionaries, and sets.

Note: the original instructions asked for a "list of 6 favorite foods"
but then referred to "city" in the append/pop/print steps (a copy-paste
mismatch in the exercise sheet). I've kept it consistent with foods,
since that's what the list actually holds.
"""

# ------------------------------------------------------------------
# 1. Lists & Tuples
# ------------------------------------------------------------------
favorite_foods = ["Doro Wat", "Injera", "Kitfo", "Shiro", "Tibs", "Pasta"]

print(f"First favorite food: {favorite_foods[0]}")
print(f"Last favorite food:  {favorite_foods[-1]}")

# Add a new food to the end of the list.
favorite_foods.append("Firfir")
print(f"After append: {favorite_foods}")

# Remove the second food (index 1) using .pop().
removed_food = favorite_foods.pop(1)
print(f"Removed '{removed_food}' using pop(). List is now: {favorite_foods}")

# Tuple of coordinates for Ethiopia (approx. Addis Ababa), then unpack it.
ethiopia_coordinates = (9.03, 38.74)  # (latitude, longitude)
latitude, longitude = ethiopia_coordinates
print(f"Ethiopia coordinates -> latitude: {latitude}, longitude: {longitude}")

print("-" * 60)

# ------------------------------------------------------------------
# 2. Dictionaries
# ------------------------------------------------------------------
student = {
    "name": "Selam Tesfaye",
    "age": 22,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science",
}

print(f"Student name:       {student['name']}")
print(f"Student department: {student['department']}")
print(f"Student grade:      {student['grade']}")

# Add a new key.
student["phone"] = "0987654321"
print(f"After adding phone: {student}")

# Update an existing key.
student["grade"] = "A+"
print(f"After updating grade: {student['grade']}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Sets
# ------------------------------------------------------------------
names_with_duplicates = ["Abel", "Sara", "Abel", "Marta", "Sara", "Dawit"]
print(f"Original list (with duplicates): {names_with_duplicates}")

unique_names = set(names_with_duplicates)
print(f"As a set (duplicates removed):   {unique_names}")

# Add a new name to the set.
unique_names.add("Hana")
print(f"After adding a new name:         {unique_names}")
