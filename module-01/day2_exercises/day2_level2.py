"""
Day 2 - Level 2
Python Fundamentals

Topics:
5. Grade Classifier
6. Number Pattern
7. While Loop Practice
8. Function Practice
"""

# ==========================================
# Exercise 5: Grade Classifier
# ==========================================

print("========== Grade Classifier ==========")

score = int(input("Enter your score (0-100): "))

if 90 <= score <= 100:
    print("Excellent")
elif 80 <= score <= 89:
    print("Very Good")
elif 70 <= score <= 79:
    print("Good")
elif 50 <= score <= 69:
    print("Pass")
elif 0 <= score < 50:
    print("Fail")
else:
    print("Invalid score. Please enter a value between 0 and 100.")

print()


# ==========================================
# Exercise 6: Number Pattern
# ==========================================

print("========== Number Pattern ==========")

for number in range(1, 21):
    if number % 2 != 0:          # Print only odd numbers
        print(number, end=" ")

print("\n")

print("Numbers divisible by 5:")

for number in range(1, 21):
    if number % 2 != 0:          # Nested if statement
        if number % 5 == 0:
            print(number)

print()


# ==========================================
# Exercise 7: While Loop Practice
# ==========================================

print("========== Sum of Positive Numbers ==========")

total = 0

while True:
    number = float(input("Enter a positive number (0 to stop): "))

    if number == 0:
        break

    if number > 0:
        total += number
    else:
        print("Please enter a positive number only.")

print(f"Total Sum = {total}")

print()


# ==========================================
# Exercise 8: Function Practice
# ==========================================

def greet(name):
    """Print a welcome message."""
    print(f"Welcome, {name}!")


def square(number):
    """Return the square of a number."""
    return number * number


def is_even(number):
    """Return True if number is even, otherwise False."""
    return number % 2 == 0


print("========== Function Practice ==========")

name = input("Enter your name: ")
greet(name)

number = int(input("Enter a number: "))

print(f"Square of {number} = {square(number)}")
print(f"Is {number} even? {is_even(number)}")