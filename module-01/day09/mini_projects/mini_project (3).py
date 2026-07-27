"""
Day 9 - Mini Project: Addis Bank Network & Priority System

A menu-driven console program combining four data structures:
  - Tree:  branch/employee hierarchy
  - Graph: customer money-transfer network (BFS/DFS traversal)
  - Heap:  urgent transaction priority queue
  - BST:   customer account number lookup

Big-O notes are included as comments next to each major operation.
"""

import heapq


# ------------------------------------------------------------------
# Tree: branch / employee hierarchy
# ------------------------------------------------------------------
class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)  # O(1) amortized


def print_tree(node, depth=0):
    """O(n) - visits every node in the hierarchy exactly once."""
    print("  " * depth + f"- {node.name}")
    for child in node.children:
        print_tree(child, depth + 1)


def find_node(node, name):
    """O(n) worst case - may have to check every node in the tree
    to find the one we're looking for (no ordering to exploit,
    unlike a BST)."""
    if node.name == name:
        return node
    for child in node.children:
        found = find_node(child, name)
        if found is not None:
            return found
    return None


# ------------------------------------------------------------------
# Graph: customer money-transfer network
# ------------------------------------------------------------------
class Graph:
    def __init__(self):
        self.adjacency_list = {}

    def add_customer(self, name):
        if name not in self.adjacency_list:
            self.adjacency_list[name] = set()  # O(1) average

    def add_connection(self, customer_a, customer_b):
        """O(1) average per connection."""
        self.add_customer(customer_a)
        self.add_customer(customer_b)
        self.adjacency_list[customer_a].add(customer_b)
        self.adjacency_list[customer_b].add(customer_a)

    def bfs(self, start):
        """Breadth-First Search - explores neighbor by neighbor, level
        by level. O(V + E): visits every vertex and edge once."""
        if start not in self.adjacency_list:
            return []
        visited = {start}
        queue = [start]
        order = []
        while queue:
            current = queue.pop(0)
            order.append(current)
            for neighbor in sorted(self.adjacency_list[current]):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order

    def dfs(self, start):
        """Depth-First Search - follows one path as deep as possible
        before backtracking. O(V + E), same reasoning as BFS."""
        if start not in self.adjacency_list:
            return []
        visited = set()
        order = []

        def _dfs_visit(node):
            visited.add(node)
            order.append(node)
            for neighbor in sorted(self.adjacency_list[node]):
                if neighbor not in visited:
                    _dfs_visit(neighbor)

        _dfs_visit(start)
        return order


# ------------------------------------------------------------------
# BST: customer account lookup
# ------------------------------------------------------------------
class BSTNode:
    def __init__(self, account_number, owner):
        self.account_number = account_number
        self.owner = owner
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, account_number, owner):
        """O(log n) average, O(n) worst case."""
        if self.root is None:
            self.root = BSTNode(account_number, owner)
        else:
            self._insert_recursive(self.root, account_number, owner)

    def _insert_recursive(self, node, account_number, owner):
        if account_number < node.account_number:
            if node.left is None:
                node.left = BSTNode(account_number, owner)
            else:
                self._insert_recursive(node.left, account_number, owner)
        else:
            if node.right is None:
                node.right = BSTNode(account_number, owner)
            else:
                self._insert_recursive(node.right, account_number, owner)

    def search(self, account_number):
        """O(log n) average, O(n) worst case."""
        return self._search_recursive(self.root, account_number)

    def _search_recursive(self, node, account_number):
        if node is None:
            return None
        if node.account_number == account_number:
            return node.owner
        elif account_number < node.account_number:
            return self._search_recursive(node.left, account_number)
        else:
            return self._search_recursive(node.right, account_number)


# ------------------------------------------------------------------
# Global state for the console program
# ------------------------------------------------------------------
head_office = TreeNode("Head Office")
transfer_graph = Graph()
urgent_transactions = []  # heap: list of (-priority, description) tuples
account_bst = BinarySearchTree()
next_account_number = 1000


def add_branch_or_employee():
    """Tree insertion - O(n) to find the parent by name, O(1) to attach."""
    parent_name = input("Enter parent name (e.g. 'Head Office'): ").strip()
    parent_node = find_node(head_office, parent_name)
    if parent_node is None:
        print(f"No node named '{parent_name}' was found.")
        return

    new_name = input("Enter new branch/employee name: ").strip()
    parent_node.add_child(TreeNode(new_name))
    print(f"Added '{new_name}' under '{parent_name}'.")


def add_transfer_connection():
    """Graph edge insertion - O(1) average."""
    customer_a = input("Enter first customer name: ").strip()
    customer_b = input("Enter second customer name: ").strip()
    transfer_graph.add_connection(customer_a, customer_b)
    print(f"Connected {customer_a} <-> {customer_b}.")


def show_connected_customers():
    """Graph traversal - O(V + E)."""
    start = input("Enter starting customer name: ").strip()
    if start not in transfer_graph.adjacency_list:
        print(f"No customer named '{start}' found in the network.")
        return

    method = input("Traversal method - BFS (b) or DFS (d): ").strip().lower()
    if method == "b":
        result = transfer_graph.bfs(start)
        print(f"BFS order from {start}: {result}")
    elif method == "d":
        result = transfer_graph.dfs(start)
        print(f"DFS order from {start}: {result}")
    else:
        print("Unknown method. Use 'b' or 'd'.")


def add_urgent_transaction():
    """Heap insertion - O(log n)."""
    description = input("Enter transaction description: ").strip()
    try:
        priority = float(input("Enter priority (higher = more urgent): "))
    except ValueError:
        print("Invalid priority.")
        return
    # Negated so the largest priority pops first from Python's min-heap.
    heapq.heappush(urgent_transactions, (-priority, description))
    print(f"Added urgent transaction: {description} (priority {priority}).")


def process_highest_priority():
    """Heap removal - O(log n)."""
    if not urgent_transactions:
        print("No urgent transactions in the queue.")
        return
    neg_priority, description = heapq.heappop(urgent_transactions)
    print(f"Processing: {description} (priority {-neg_priority}).")


def search_customer_account():
    """BST search - O(log n) average."""
    try:
        account_number = int(input("Enter account number to search: "))
    except ValueError:
        print("Invalid account number.")
        return
    owner = account_bst.search(account_number)
    if owner is None:
        print("No account found with that number.")
    else:
        print(f"Account #{account_number} belongs to {owner}.")


def create_account_for_bst():
    """Helper option so option 6 has something to search - inserts a
    new account into the BST. O(log n) average."""
    global next_account_number
    owner = input("Enter account owner's name: ").strip()
    account_number = next_account_number
    next_account_number += 1
    account_bst.insert(account_number, owner)
    print(f"Created account #{account_number} for {owner}.")


def show_menu():
    print("\n=== Addis Bank Network & Priority System ===")
    print("1. Add new branch / employee (Tree)")
    print("2. Add money transfer connection (Graph)")
    print("3. Show all connected customers using BFS/DFS")
    print("4. Add urgent transaction (Heap)")
    print("5. Process highest priority transaction")
    print("6. Search for customer account in BST")
    print("7. Create a new account (adds to BST)")
    print("8. Show branch hierarchy")
    print("9. Exit")


def run_system():
    while True:
        show_menu()
        choice = input("Choose an option (1-9): ").strip()

        if choice == "1":
            add_branch_or_employee()
        elif choice == "2":
            add_transfer_connection()
        elif choice == "3":
            show_connected_customers()
        elif choice == "4":
            add_urgent_transaction()
        elif choice == "5":
            process_highest_priority()
        elif choice == "6":
            search_customer_account()
        elif choice == "7":
            create_account_for_bst()
        elif choice == "8":
            print_tree(head_office)
        elif choice == "9":
            print("Exiting Addis Bank Network & Priority System. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 9.")


if __name__ == "__main__":
    run_system()
