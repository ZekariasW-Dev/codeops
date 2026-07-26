"""
Day 7 - Intermediate: DSA I - Linear Structures & Big-O
Covers: analyzing custom functions for Big-O, a singly linked list,
a stack (LIFO), and a queue (FIFO).
"""

# ------------------------------------------------------------------
# 5. Big-O Analysis
# ------------------------------------------------------------------
def find_max(numbers):
    """
    Single pass through the list, comparing each element once.
    Time complexity: O(n) - one loop over n elements.
    """
    if not numbers:
        return None
    max_value = numbers[0]
    for value in numbers:
        if value > max_value:
            max_value = value
    return max_value


def find_duplicates_naive(numbers):
    """
    Two nested loops, each running roughly n times.
    Time complexity: O(n^2) - for every element, we scan the whole
    list again looking for a match.
    """
    duplicates = []
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] == numbers[j] and numbers[i] not in duplicates:
                duplicates.append(numbers[i])
    return duplicates


sample = [4, 9, 2, 7, 9, 4, 1]
print(f"find_max({sample}) = {find_max(sample)}  (O(n))")
print(f"find_duplicates_naive({sample}) = {find_duplicates_naive(sample)}  (O(n^2))")

print("-" * 60)

# ------------------------------------------------------------------
# 6. Linked List Basics
# ------------------------------------------------------------------
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None  # points to the next Node, or None at the end


class LinkedList:
    def __init__(self):
        self.head = None  # the first node in the list

    def append(self, value):
        """Adds a new node to the end of the list. O(n) since we walk
        to the end - a real implementation would keep a tail pointer
        to make this O(1)."""
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def print_list(self):
        """Prints every value in order, O(n)."""
        values = []
        current = self.head
        while current is not None:
            values.append(str(current.value))
            current = current.next
        print(" -> ".join(values) if values else "(empty list)")


linked_list = LinkedList()
linked_list.append("Abel")
linked_list.append("Sara")
linked_list.append("Marta")
linked_list.print_list()

print("-" * 60)

# ------------------------------------------------------------------
# 7. Stack (LIFO) - Last In, First Out
# ------------------------------------------------------------------
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)  # O(1) amortized

    def pop(self):
        if not self._items:
            return None
        return self._items.pop()  # O(1) - removes from the end

    def peek(self):
        if not self._items:
            return None
        return self._items[-1]  # O(1)

    def is_empty(self):
        return len(self._items) == 0


def reverse_string(text):
    """Uses a stack to reverse a string - push every character, then
    pop them off, which naturally comes out in reverse order."""
    stack = Stack()
    for char in text:
        stack.push(char)

    reversed_chars = []
    while not stack.is_empty():
        reversed_chars.append(stack.pop())

    return "".join(reversed_chars)


original = "Addis Ababa"
print(f"'{original}' reversed via stack -> '{reverse_string(original)}'")

print("-" * 60)

# ------------------------------------------------------------------
# 8. Queue (FIFO) - First In, First Out
# ------------------------------------------------------------------
from collections import deque


class Queue:
    def __init__(self):
        # deque gives O(1) enqueue/dequeue from either end, unlike a
        # plain list where removing from the front is O(n).
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)  # O(1)

    def dequeue(self):
        if not self._items:
            return None
        return self._items.popleft()  # O(1)

    def is_empty(self):
        return len(self._items) == 0


bank_queue = Queue()
bank_queue.enqueue("Customer 1: Abel")
bank_queue.enqueue("Customer 2: Sara")
bank_queue.enqueue("Customer 3: Marta")

print("Bank teller serving customers in arrival order:")
while not bank_queue.is_empty():
    print(f"  Now serving -> {bank_queue.dequeue()}")
