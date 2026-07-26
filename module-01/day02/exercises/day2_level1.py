"""
Day 2 - Level 1
Python Fundamentals

Topics:
1. Variables & Data Types
2. Arithmetic Operations
3. Type Conversion
4. Simple Decision (if/else)
"""

# ==========================================
# Exercise 1: Variables & Data Types
# ==========================================

# Creating variables
full_name = "Zekarias Woreket"
age = 25
height = 1.70
is_student = True
favorite_food = "Pizza"

# Display information using f-strings
print("========== Personal Information ==========")
print(f"My name is {full_name}.")
print(f"I am {age} years old.")
print(f"My height is {height} meters.")
print(f"Student: {is_student}")
print(f"My favorite food is {favorite_food}.")
print()


# ==========================================
# Exercise 2: Arithmetic Operations
# ==========================================

print("========== Arithmetic Operations ==========")

num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

print(f"\nFirst Number : {num1}")
print(f"Second Number: {num2}")

print(f"Sum             = {num1 + num2}")
print(f"Difference      = {num1 - num2}")
print(f"Product         = {num1 * num2}")
print(f"Division        = {num1 / num2}")
print(f"Floor Division  = {num1 // num2}")
print(f"Remainder       = {num1 % num2}")

print()


# ==========================================
# Exercise 3: Type Conversion
# ==========================================

print("========== Age Calculator ==========")

birth_year = int(input("Enter your birth year: "))

current_year = 2026

calculated_age = current_year - birth_year

print(f"You are {calculated_age} years old.")

print()


# ==========================================
# Exercise 4: Simple Decision
# ==========================================

print("========== Pass or Fail ==========")

score = int(input("Enter your score (0-100): "))

if score >= 50:
    print("Pass")
else:
    print("Fail")