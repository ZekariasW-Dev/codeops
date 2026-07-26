"""
Day 7 - Basic: DSA I - Linear Structures & Big-O
Covers: Big-O of common operations, ranking complexities, list
operations, and dictionary operations.
"""

# ------------------------------------------------------------------
# 1. Big-O Notation
# ------------------------------------------------------------------
# Answers, with reasoning:
#
# - Accessing an element in a Python list by index:      O(1)
#   Lists are backed by contiguous arrays, so list[i] jumps straight
#   to the memory address - no scanning required.
#
# - Searching for an element in a list using `in`:        O(n)
#   Python has to check elements one by one until it finds a match
#   (or reaches the end), so the worst case scales with list size.
#
# - Inserting at the beginning of a list:                 O(n)
#   Every existing element has to shift right by one position to
#   make room, so the cost grows with the list's length.
#
# - Dictionary lookup by key:                              O(1) average
#   Dictionaries are hash tables: the key's hash points almost
#   directly to its value's location, independent of dict size.
print("See the comments above for the Big-O answers to exercise 1.")

print("-" * 60)

# ------------------------------------------------------------------
# 2. Compare Complexities
# ------------------------------------------------------------------
# Ranked fastest to slowest for large n (n = 1,000,000):
#   1. O(1)      - constant time, doesn't grow with n at all
#   2. O(log n)  - grows very slowly (log2(1,000,000) is only ~20)
#   3. O(n)      - grows directly with n (1,000,000 steps)
#   4. O(n^2)    - grows with the square of n (1,000,000,000,000 steps!)
print("Ranking (fastest -> slowest): O(1) < O(log n) < O(n) < O(n^2)")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Arrays / Lists
# ------------------------------------------------------------------
student_names = [
    "Abel", "Sara", "Marta", "Dawit", "Hana",
    "Selam", "Kebede", "Meron", "Yonas", "Liya",
]

# Accessing by index - O(1)
print(f"Student at index 0: {student_names[0]}")
print(f"Student at index 5: {student_names[5]}")

# Adding at the end - O(1) amortized
student_names.append("Bereket")
print(f"After append: {student_names}")

# Inserting at position 0 - O(n), everything else shifts right
student_names.insert(0, "Ephrem")
print(f"After insert at position 0: {student_names}")

print("-" * 60)

# ------------------------------------------------------------------
# 4. Hashmaps (Dictionaries)
# ------------------------------------------------------------------
student_grades = {
    "Abel": "A",
    "Sara": "B+",
    "Marta": "A-",
    "Dawit": "C",
    "Hana": "B",
}

# Add a new student - O(1) average
student_grades["Selam"] = "A"
print(f"After adding Selam: {student_grades}")

# Update a grade - O(1) average
student_grades["Dawit"] = "B-"
print(f"After updating Dawit's grade: {student_grades['Dawit']}")

# Check if a student exists - O(1) average, much faster than
# scanning a list of (name, grade) pairs, which would be O(n).
name_to_check = "Marta"
if name_to_check in student_grades:
    print(f"{name_to_check} exists, with grade {student_grades[name_to_check]}.")
else:
    print(f"{name_to_check} was not found.")
