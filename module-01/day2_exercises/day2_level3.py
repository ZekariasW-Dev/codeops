"""
Day 2 - Level 3
Python Fundamentals

Topics:
9. Tip Calculator
10. Simple Quiz Game
11. Function with Default & Return
"""

# ==========================================
# Exercise 9: Tip Calculator
# ==========================================

def calculate_tip(bill_amount, tip_percentage):
    """Calculate the tip amount."""
    return bill_amount * (tip_percentage / 100)


def calculate_total(bill_amount, tip_amount):
    """Calculate the total bill."""
    return bill_amount + tip_amount


print("========== Tip Calculator ==========")

bill = float(input("Enter the bill amount: "))
tip_percent = int(input("Enter tip percentage (10, 15, or 20): "))
people = int(input("Enter number of people splitting the bill: "))

tip = calculate_tip(bill, tip_percent)
total = calculate_total(bill, tip)
per_person = total / people

print("\n------ Bill Summary ------")
print(f"Bill Amount     : ${bill:.2f}")
print(f"Tip Amount      : ${tip:.2f}")
print(f"Total Amount    : ${total:.2f}")
print(f"Each Person Pays: ${per_person:.2f}")

print()


# ==========================================
# Exercise 10: Simple Quiz Game
# ==========================================

def ask_question(question, answer):
    """Ask a question and return 1 if correct."""
    user_answer = input(question + " ").strip().lower()

    if user_answer == answer.lower():
        print("Correct!\n")
        return 1
    else:
        print(f"Wrong! Correct answer: {answer}\n")
        return 0


print("========== Ethiopia Quiz ==========")

score = 0

score += ask_question("1. What is the capital city of Ethiopia?", "Addis Ababa")
score += ask_question("2. How many colors are on the Ethiopian flag?", "3")
score += ask_question("3. Which continent is Ethiopia in?", "Africa")
score += ask_question("4. What is the currency of Ethiopia?", "Birr")
score += ask_question("5. What is the longest river in Ethiopia?", "Abay")

print(f"Final Score: {score}/5")

if score == 5:
    print("Excellent! Perfect score!")
elif score >= 4:
    print("Very Good!")
elif score >= 3:
    print("Good Job!")
else:
    print("Keep practicing!")

print()


# ==========================================
# Exercise 11: Function with Default Parameters
# ==========================================

def calculate_final_price(price, tax_rate=0.15, discount=0):
    """
    Calculate the final price after adding tax
    and subtracting the discount.
    """
    tax = price * tax_rate
    final_price = price + tax - discount
    return final_price


print("========== Final Price Calculator ==========")

print(f"Price 1: ${calculate_final_price(100):.2f}")
print(f"Price 2: ${calculate_final_price(200, 0.20):.2f}")
print(f"Price 3: ${calculate_final_price(300, 0.15, 25):.2f}")