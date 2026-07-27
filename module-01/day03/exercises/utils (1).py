git staus"""
utils.py - a small reusable module for Day 3, exercise 7 (Modules & Import).
Import this from day3_level2.py (or any other file) with:
    import utils
    utils.add_tax(100)
"""


def add_tax(price, rate=0.15):
    """
    Accepts a price and a tax rate (defaults to 15%).
    Returns the price with tax included.
    """
    return price + (price * rate)
