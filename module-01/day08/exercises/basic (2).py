"""
Day 8 - Basic/Intermediate: Recursion, Searching & Sorting
Covers: factorial (recursive + iterative), recursive list sum,
linear search, binary search, and bubble sort.
"""


# ------------------------------------------------------------------
# 1. Recursion Basics
# ------------------------------------------------------------------
def factorial_recursive(n):
    """
    Recursive version. Base case: factorial(0) = 1.
    Each call multiplies n by the factorial of everything below it.
    """
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)


def factorial_iterative(n):
    """Iterative version - same result, no call stack growth."""
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


print(f"factorial_recursive(5) = {factorial_recursive(5)}")
print(f"factorial_iterative(5) = {factorial_iterative(5)}")

print("-" * 60)

# ------------------------------------------------------------------
# 2. Recursion with Lists
# ------------------------------------------------------------------
def sum_list(numbers):
    """
    Base case: an empty list sums to 0.
    Recursive case: first element + sum of everything else.
    """
    if not numbers:
        return 0
    return numbers[0] + sum_list(numbers[1:])


sample_numbers = [4, 8, 15, 16, 23, 42]
print(f"sum_list({sample_numbers}) = {sum_list(sample_numbers)}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Linear Search
# ------------------------------------------------------------------
def linear_search(arr, target):
    """
    Checks every element in order until a match is found.
    Time complexity: O(n) - works on unsorted data, but has to
    potentially check every single element.
    """
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1


unsorted_arr = [34, 7, 23, 90, 15, 2]
print(f"linear_search({unsorted_arr}, 90) = {linear_search(unsorted_arr, 90)}")
print(f"linear_search({unsorted_arr}, 100) = {linear_search(unsorted_arr, 100)}")

print("-" * 60)

# ------------------------------------------------------------------
# 4. Binary Search
# ------------------------------------------------------------------
def binary_search(arr, target):
    """
    Repeatedly halves the search range by comparing the target to
    the middle element. Time complexity: O(log n).

    Why the array MUST be sorted:
    Binary search decides which half to discard based on comparing
    the target to the middle value (target < mid -> discard the right
    half, target > mid -> discard the left half). That logic only
    holds if every value to the left of "mid" is guaranteed smaller
    and everything to the right is guaranteed larger - i.e. the array
    is sorted. On unsorted data, the target could be anywhere, so
    discarding half the array could throw away the very element
    you're looking for.
    """
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1


sorted_arr = sorted(unsorted_arr)
print(f"Sorted array for binary search: {sorted_arr}")
print(f"binary_search({sorted_arr}, 23) = {binary_search(sorted_arr, 23)}")
print(f"binary_search({sorted_arr}, 100) = {binary_search(sorted_arr, 100)}")

print("-" * 60)

# ------------------------------------------------------------------
# 5. Bubble Sort
# ------------------------------------------------------------------
def bubble_sort(arr):
    """
    Repeatedly swaps adjacent out-of-order elements, 'bubbling' the
    largest unsorted value to the end each pass. Time complexity:
    O(n^2) worst case.
    """
    array = arr.copy()  # don't mutate the caller's original list
    n = len(array)

    for pass_number in range(n - 1):
        swapped = False
        for i in range(n - 1 - pass_number):
            if array[i] > array[i + 1]:
                array[i], array[i + 1] = array[i + 1], array[i]
                swapped = True
        print(f"After pass {pass_number + 1}: {array}")
        if not swapped:
            # Already sorted - no point running further passes.
            break

    return array


to_sort = [64, 25, 12, 22, 11]
print(f"Bubble sorting: {to_sort}")
sorted_result = bubble_sort(to_sort)
print(f"Final sorted array: {sorted_result}")
