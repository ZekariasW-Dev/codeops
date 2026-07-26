"""
Day 7 - Advanced: DSA I - Linear Structures & Big-O
Covers: benchmarking list vs dict search and list vs deque insertion,
picking the right structure for real scenarios, and comparing removing
the middle element from a list vs a linked list.
"""

import time
from collections import deque

# ------------------------------------------------------------------
# 9. Performance Comparison
# ------------------------------------------------------------------
SIZE = 100_000

# --- Search: list (O(n)) vs dictionary (O(1) average) ---
number_list = list(range(SIZE))
number_dict = {n: True for n in range(SIZE)}
target = SIZE - 1  # worst case for a list: the item is at the very end

start = time.perf_counter()
found_in_list = target in number_list
list_search_time = time.perf_counter() - start

start = time.perf_counter()
found_in_dict = target in number_dict
dict_search_time = time.perf_counter() - start

print(f"Searching {SIZE:,} items:")
print(f"  List search:       {list_search_time:.6f} seconds")
print(f"  Dictionary search: {dict_search_time:.6f} seconds")
print("  -> Dictionary search is dramatically faster because it's O(1) "
      "average vs the list's O(n).")

print("-" * 60)

# --- Insert at the beginning: list (O(n) each) vs deque (O(1) each) ---
INSERTS = 10_000

start = time.perf_counter()
growing_list = []
for i in range(INSERTS):
    growing_list.insert(0, i)  # O(n) every time - shifts everything right
list_insert_time = time.perf_counter() - start

start = time.perf_counter()
growing_deque = deque()
for i in range(INSERTS):
    growing_deque.appendleft(i)  # O(1) every time
deque_insert_time = time.perf_counter() - start

print(f"Inserting {INSERTS:,} elements at the front:")
print(f"  list.insert(0, ...):    {list_insert_time:.6f} seconds")
print(f"  deque.appendleft(...):  {deque_insert_time:.6f} seconds")
print("  -> deque wins because it's a doubly linked structure under the "
      "hood, so front-inserts don't require shifting every element.")

print("-" * 60)

# ------------------------------------------------------------------
# 10. Choose the Right Structure
# ------------------------------------------------------------------
# a) Checking if a username is already taken:
#    -> Set or Dictionary. O(1) average membership check ("username in
#       taken_usernames") - far better than scanning a list (O(n)) for
#       every signup attempt.
#
# b) Processing tasks in the order they arrive (customer support):
#    -> Queue (FIFO). New tasks go to the back with enqueue() (O(1)),
#       and the oldest task is handled next with dequeue() (O(1)).
#       This naturally matches "first come, first served."
#
# c) Implementing "Undo" in a text editor:
#    -> Stack (LIFO). Each action is pushed as it happens; "Undo"
#       pops the most recent one off. Both push and pop are O(1),
#       and LIFO order is exactly what "undo the last thing" needs.
#
# d) Storing student IDs for fast lookup:
#    -> Dictionary (or set, if you only need existence checks, not
#       associated data). O(1) average lookup by ID, versus O(n) to
#       scan a list for a matching ID.
print("See the comments above for the recommended structure and "
      "justification for each of the 4 scenarios.")

print("-" * 60)

# ------------------------------------------------------------------
# 11. Linked List vs Array
# ------------------------------------------------------------------
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def to_list(self):
        values = []
        current = self.head
        while current is not None:
            values.append(current.value)
            current = current.next
        return values


def remove_middle_from_array(array):
    """
    Removing the middle element from a Python list.
    Time complexity: O(n) - Python has to shift every element after
    the removed index down by one to close the gap.
    """
    if not array:
        return array
    middle_index = len(array) // 2
    array.pop(middle_index)
    return array


def remove_middle_from_linked_list(linked_list):
    """
    Removing the middle element from a singly linked list.
    Time complexity: O(n) too - we still have to walk from the head
    to find the middle (no random access), but once we're there,
    unlinking the node itself is O(1) (just re-point .next).
    """
    length = 0
    current = linked_list.head
    while current is not None:
        length += 1
        current = current.next

    if length == 0:
        return linked_list

    middle_index = length // 2

    if middle_index == 0:
        linked_list.head = linked_list.head.next
        return linked_list

    current = linked_list.head
    for _ in range(middle_index - 1):
        current = current.next
    # Skip over the middle node by re-pointing .next - the actual
    # removal step here is O(1), unlike the array's O(n) shift.
    current.next = current.next.next
    return linked_list


array_example = [10, 20, 30, 40, 50]
print(f"Array before: {array_example}")
remove_middle_from_array(array_example)
print(f"Array after removing middle: {array_example}")

ll_example = LinkedList()
for value in [10, 20, 30, 40, 50]:
    ll_example.append(value)
print(f"Linked list before: {ll_example.to_list()}")
remove_middle_from_linked_list(ll_example)
print(f"Linked list after removing middle: {ll_example.to_list()}")

# Trade-off discussion:
# - Array: finding the middle is O(1) (direct index math), but the
#   removal itself is O(n) because everything after it must shift.
# - Linked List: finding the middle is O(n) (must walk node by node -
#   no random access), but once found, removal is O(1) (just relink
#   pointers). Arrays win when you need fast random access; linked
#   lists win when you're doing frequent insert/remove in the middle
#   of an already-known position (e.g. you're holding a reference to
#   the node itself).
print("\nSee the comments above for the array-vs-linked-list trade-off discussion.")
