"""
Day 9 - Basic: Trees, Graphs & Heaps
Covers: a general tree (bank branch hierarchy), a Binary Search Tree,
a graph (customer transfer network), and a heap-based priority queue.
"""

import heapq


# ------------------------------------------------------------------
# 1. Tree Basics
# ------------------------------------------------------------------
class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []  # a general tree node can have any number of children

    def add_child(self, child_node):
        self.children.append(child_node)  # O(1) amortized


def print_tree(node, depth=0):
    """Prints the tree depth-first, indenting each level. O(n) - visits
    every node exactly once."""
    print("  " * depth + f"- {node.name}")
    for child in node.children:
        print_tree(child, depth + 1)


# Build the bank hierarchy:
# Head Office
#   Bole Branch
#     Teller
#     Loan Officer
#   Piassa Branch
head_office = TreeNode("Head Office")
bole_branch = TreeNode("Bole Branch")
piassa_branch = TreeNode("Piassa Branch")
teller = TreeNode("Teller")
loan_officer = TreeNode("Loan Officer")

head_office.add_child(bole_branch)
head_office.add_child(piassa_branch)
bole_branch.add_child(teller)
bole_branch.add_child(loan_officer)

print("Bank Hierarchy:")
print_tree(head_office)

print("-" * 60)

# ------------------------------------------------------------------
# 2. Binary Search Tree
# ------------------------------------------------------------------
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        """O(log n) average (balanced tree), O(n) worst case (a
        skewed/linked-list-like tree)."""
        if self.root is None:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        """O(log n) average, O(n) worst case - same reasoning as insert:
        each step eliminates one whole subtree, but only if the tree
        is reasonably balanced."""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)


bst = BinarySearchTree()
for number in [50, 30, 70, 20, 40, 60]:
    bst.insert(number)

print(f"Does 40 exist in the BST? {bst.search(40)}")
print(f"Does 100 exist in the BST? {bst.search(100)}")

print("-" * 60)

# ------------------------------------------------------------------
# 3. Graph Basics
# ------------------------------------------------------------------
class Graph:
    """An undirected graph using an adjacency list - each customer
    maps to a set of customers they've transferred money with."""
    def __init__(self):
        self.adjacency_list = {}

    def add_customer(self, name):
        if name not in self.adjacency_list:
            self.adjacency_list[name] = set()  # O(1) average

    def add_connection(self, customer_a, customer_b):
        """O(1) average - a money transfer creates an edge both ways."""
        self.add_customer(customer_a)
        self.add_customer(customer_b)
        self.adjacency_list[customer_a].add(customer_b)
        self.adjacency_list[customer_b].add(customer_a)

    def print_graph(self):
        """O(V + E) - visits every customer (vertex) and every
        connection (edge) exactly once."""
        for customer, connections in self.adjacency_list.items():
            print(f"  {customer} -> {sorted(connections)}")


transfer_graph = Graph()
for customer in ["Almaz", "Dawit", "Tigist", "Hanna"]:
    transfer_graph.add_customer(customer)

transfer_graph.add_connection("Almaz", "Dawit")
transfer_graph.add_connection("Almaz", "Tigist")
transfer_graph.add_connection("Dawit", "Hanna")

print("Customer Transfer Network:")
transfer_graph.print_graph()

print("-" * 60)

# ------------------------------------------------------------------
# 4. Heap Basics
# ------------------------------------------------------------------
# Python's heapq is a MIN-heap: it always pops the smallest item.
# To treat a bigger amount as "higher priority", we store the amount
# as a NEGATIVE number - the most negative value (i.e. the largest
# original amount) then pops first.
urgent_transactions = []

heapq.heappush(urgent_transactions, (-5000, "Big Loan"))       # O(log n)
heapq.heappush(urgent_transactions, (-200, "Small Deposit"))    # O(log n)
heapq.heappush(urgent_transactions, (-10000, "Fraud Alert"))    # O(log n)

priority, description = heapq.heappop(urgent_transactions)     # O(log n)
print(f"Highest priority transaction: {description} (amount: {-priority})")
