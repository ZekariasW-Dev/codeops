"""
Day 3 - Level 3: Files & Errors
Covers: writing/reading a text file and computing an average from it,
plus try/except/finally error handling.
"""

# ------------------------------------------------------------------
# 8. File Reading & Writing
# ------------------------------------------------------------------
students = [
    ("Abel", 85),
    ("Sara", 92),
    ("Marta", 78),
    ("Dawit", 66),
    ("Hana", 95),
]

# Write the 5 student names and scores to students.txt.
# Each line looks like: "Abel,85"
with open("students.txt", "w") as file:
    for name, score in students:
        file.write(f"{name},{score}\n")

print("students.txt written successfully.")

# Read the file back and compute the average score.
try:
    with open("students.txt", "r") as file:
        lines = file.readlines()

    scores = []
    for line in lines:
        name, score = line.strip().split(",")
        scores.append(int(score))

    average_score = sum(scores) / len(scores)
    print(f"Average score from students.txt: {average_score:.2f}")

except FileNotFoundError:
    print("students.txt was not found. Make sure it was written first.")

print("-" * 60)

# ------------------------------------------------------------------
# 9. Error Handling
# ------------------------------------------------------------------
try:
    first_number = float(input("Enter the first number: "))
    second_number = float(input("Enter the second number: "))
    result = first_number / second_number
    print(f"{first_number} / {second_number} = {result:.2f}")

except ValueError:
    print("Error: please enter valid numbers only (non-numeric input detected).")

except ZeroDivisionError:
    print("Error: cannot divide by zero.")

finally:
    # finally always runs, whether an error happened or not.
    print("Calculation attempt completed")
