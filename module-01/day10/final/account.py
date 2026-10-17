from collections import deque

# Singleton
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000

        return cls._instance


# Observer 1
class SMSAlert:
    def update(self, account, message):
        print("SMS Alert:", account.owner, "-", message)


# Observer 2
class AuditLog:
    def update(self, account, message):
        print("Audit Log: Account", account.account_number, "-", message)


# Parent class
class Account:

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self.observers = []
        self.config = BankConfig()

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.update(self, message)

    def deposit(self, amount):

        if amount <= 0:
            print("Deposit amount must be positive.")
            return False

        self.__balance += amount

        self.notify(
            f"Deposit: {amount} ETB, Balance: {self.__balance:.2f} ETB"
        )

        return True

    def withdraw(self, amount):

        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False

        if amount > self.__balance:
            print("Insufficient funds.")
            return False

        self.__balance -= amount

        self.notify(
            f"Withdrawal: {amount} ETB, Balance: {self.__balance:.2f} ETB"
        )

        return True

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, amount):
        self.__balance = amount

    def statement(self):
        return (
            f"Account: {self.owner}, "
            f"Number: {self.account_number}, "
            f"Balance: {self.balance:.2f} ETB"
        )


# Child class
class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = self.config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print("Interest added:", interest, "ETB")

    def statement(self):
        return f"Savings Account - {self.owner}: {self.balance:.2f} ETB"


# Child class
class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = self.config.overdraft_limit

    def withdraw(self, amount):

        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return False

        if amount <= self.balance + self.overdraft:

            self.balance -= amount

            self.notify(
                f"Withdrawal: {amount} ETB, "
                f"Balance: {self.balance:.2f} ETB"
            )

            return True

        print("Withdrawal denied.")
        return False

    def statement(self):
        return f"Current Account - {self.owner}: {self.balance:.2f} ETB"


# Factory
class AccountFactory:

    @staticmethod
    def create(account_type, owner, number, balance=0):

        if account_type == "savings":
            return SavingsAccount(owner, number, balance)

        if account_type == "current":
            return CurrentAccount(owner, number, balance)

        raise ValueError("Unknown account type")


# Recursion
def recursive_total(history, index=0):

    if index == len(history):
        return 0

    return history[index]["amount"] + recursive_total(
        history,
        index + 1
    )


# Binary Search
def binary_search(numbers, target):

    low = 0
    high = len(numbers) - 1

    while low <= high:

        middle = (low + high) // 2

        if numbers[middle] == target:
            return middle

        if numbers[middle] < target:
            low = middle + 1
        else:
            high = middle - 1

    return -1


# Account Registry
class AccountRegistry:

    def __init__(self):
        self.accounts = {}
        self.order = []
        self.history = {}

    def add(self, account):

        self.accounts[account.account_number] = account
        self.order.append(account.account_number)
        self.history[account.account_number] = []

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):

        result = []

        for number in self.order:
            result.append(self.accounts[number])

        return result

    def record_transaction(self, account, transaction_type, amount):

        self.history[account.account_number].append({
            "type": transaction_type,
            "amount": amount
        })

    def find_by_number(self, number):

        numbers = sorted(self.accounts.keys())

        index = binary_search(numbers, number)

        if index != -1:
            return self.accounts[numbers[index]]

        return None

    def total_transactions(self, number):

        account = self.find_by_number(number)

        if account is None:
            return 0

        return recursive_total(self.history[number])

    def top_by_balance(self, n=5):

        accounts = sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )

        return accounts[:n]

    def deposit(self, number, amount):

        account = self.find(number)

        if account is None:
            print("Account not found.")
            return False

        success = account.deposit(amount)

        if success:
            self.record_transaction(
                account,
                "deposit",
                amount
            )

        return success

    def withdraw(self, number, amount):

        account = self.find(number)

        if account is None:
            print("Account not found.")
            return False

        success = account.withdraw(amount)

        if success:
            self.record_transaction(
                account,
                "withdraw",
                amount
            )

        return success

    # Undo using stack
    def undo_last(self, number):

        account = self.find(number)

        if account is None:
            print("Account not found.")
            return False

        history = self.history[number]

        if len(history) == 0:
            print("No transactions to undo.")
            return False

        transaction = history.pop()

        if transaction["type"] == "deposit":

            account.balance -= transaction["amount"]

            print(
                "Undo deposit:",
                transaction["amount"],
                "ETB"
            )

        elif transaction["type"] == "withdraw":

            account.balance += transaction["amount"]

            print(
                "Undo withdrawal:",
                transaction["amount"],
                "ETB"
            )

        return True

# Create Accounts

account1 = AccountFactory.create("savings","John Doe","1234567890",1000)
account2 = AccountFactory.create("savings","Alice Smith","2345678901",2000)
account3 = AccountFactory.create("current","Bob Johnson","3456789012",1000)

# Observers

sms = SMSAlert()
audit = AuditLog()

account1.subscribe(sms)
account1.subscribe(audit)

account2.subscribe(sms)
account2.subscribe(audit)

account3.subscribe(sms)
account3.subscribe(audit)

# Test Accounts

account1.deposit(500)
account1.withdraw(200)

print("Balance:", account1.balance)
print(account1.statement())

account2.add_interest()

print("Balance:", account2.balance)
print(account2.statement())

account3.withdraw(1200)

print("Balance:", account3.balance)
print(account3.statement())

# Singleton Test

config1 = BankConfig()
config2 = BankConfig()

print("Interest rate:", config1.interest_rate)
print("Overdraft:", config1.overdraft_limit)
print("Same object:", config1 is config2)

# Registry

registry = AccountRegistry()

registry.add(account1)
registry.add(account2)
registry.add(account3)

found = registry.find("2345678901")

if found:
    print("Found account:", found.owner)


print("\nAll Accounts")

for account in registry.list_all():
    print(account.account_number,"-",account.owner,"-",account.balance)

# Transactions

registry.deposit("1234567890", 500)
registry.withdraw("1234567890", 200)
registry.deposit("1234567890", 1500)
registry.deposit("1234567890", 700)

print("Balance:", account1.balance)
print("Transaction History:")
print(registry.history["1234567890"])


# Undo last transaction
registry.undo_last("1234567890")

print("Balance after undo:", account1.balance)

# Undo another transaction
registry.undo_last("1234567890")

print("Balance after second undo:", account1.balance)

# Top Accounts

top_accounts = registry.top_by_balance(2)

print("\nTop Accounts:")

for account in top_accounts:
    print(account.owner, "-", account.balance, "ETB")

# Binary Search

found = registry.find_by_number("2345678901")

if found:
    print("\nBinary Search Found:", found.owner)
else:
    print("\nAccount not found.")

# Recursive Total

total = registry.total_transactions("1234567890")

print("Total transactions:", total, "ETB")