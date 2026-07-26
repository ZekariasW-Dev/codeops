"""
Day 8 - Advanced: Recursion, Searching & Sorting
Covers: recursive string reversal, recursive counting, selection sort
vs insertion sort (with swap/comparison counts), and the two-pointer
technique.
"""


# ------------------------------------------------------------------
# 6. Recursive Problems
# ------------------------------------------------------------------
def reverse_string_recursive(text):
    """
    Base case: an empty (or single-character) string is already its
    own reverse. Recursive case: reverse everything after the first
    character, then tack the first character on at the end.
    """
    if len(text) <= 1:
        return text
    return reverse_string_recursive(text[1:]) + text[0]


def count_occurrences_recursive(numbers, target):
    """
    Base case: an empty list has zero occurrences.
    Recursive case: check if the first element matches, then add
    that (0 or 1) to however many times target appears in the rest.
    """
    if not numbers:
        return 0
    first_match = 1 if numbers[0] == target else 0
    return first_match + count_occurrences_recursive(numbers[1:], target)


word = "Ethiopia"
print(f"reverse_string_recursive('{word}') = '{reverse_string_recursive(word)}'")

numbers_with_repeats = [3, 7, 3, 9, 3, 1, 7]
print(f"count_occurrences_recursive({numbers_with_repeats}, 3) = "
      f"{count_occurrences_recursive(numbers_with_repeats, 3)}")

print("-" * 60)

# ------------------------------------------------------------------
# 7. Sorting Comparison
# ------------------------------------------------------------------
def selection_sort(arr):
    """
    Repeatedly finds the minimum of the unsorted portion and swaps it
    into place. Time complexity: O(n^2), but only up to n-1 SWAPS
    (fewer swaps than bubble sort, though comparisons are still O(n^2)).
    """
    array = arr.copy()
    n = len(array)
    comparisons = 0
    swaps = 0

    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if array[j] < array[min_index]:
                min_index = j
        if min_index != i:
            array[i], array[min_index] = array[min_index], array[i]
            swaps += 1

    return array, comparisons, swaps


def insertion_sort(arr):
    """
    Builds up a sorted portion one element at a time, shifting larger
    elements right to make room. Time complexity: O(n^2) worst case,
    but O(n) best case on already-sorted (or nearly sorted) data.
    """
    array = arr.copy()
    comparisons = 0
    swaps = 0

    for i in range(1, len(array)):
        key = array[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if array[j] > key:
                array[j + 1] = array[j]
                swaps += 1
                j -= 1
            else:
                break
        array[j + 1] = key

    return array, comparisons, swaps


test_data = [64, 25, 12, 22, 11, 90, 5]

selection_result, selection_comparisons, selection_swaps = selection_sort(test_data)
insertion_result, insertion_comparisons, insertion_swaps = insertion_sort(test_data)

print(f"Original list: {test_data}")
print(f"Selection Sort -> {selection_result}")
print(f"  Comparisons: {selection_comparisons}, Swaps: {selection_swaps}")
print(f"Insertion Sort -> {insertion_result}")
print(f"  Comparisons: {insertion_comparisons}, Swaps: {insertion_swaps}")
print("Note: Selection Sort makes at most n-1 swaps regardless of the "
      "input, while Insertion Sort's swap count depends heavily on how "
      "'unsorted' the data already is.")

print("-" * 60)

# ------------------------------------------------------------------
# 8. Two Pointer Technique
# ------------------------------------------------------------------
def two_sum_sorted(arr, target):
    """
    Given a SORTED array, uses two pointers (one at each end) moving
    inward to find a pair that adds up to target.
    Time complexity: O(n) - a single pass, versus the O(n^2) of
    checking every possible pair with nested loops.
    """
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return (arr[left], arr[right])
        elif current_sum < target:
            left += 1   # sum too small, need a bigger left value
        else:
            right -= 1  # sum too large, need a smaller right value

    return None


sorted_numbers = [2, 7, 11, 15, 18, 24, 30]
target_sum = 26
result = two_sum_sorted(sorted_numbers, target_sum)
print(f"Two numbers in {sorted_numbers} that add up to {target_sum}: {result}")
