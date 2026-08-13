// ===== EXERCISE 4: Spread Update =====

const customer = {
    id: 1,
    name: 'Almaz Bekele',
    city: 'Addis Ababa',
    balance: 1500,
    isMember: true
};

console.log('=== Original Customer ===');
console.log(customer);

// ===== COPY WITH SPREAD =====
const copy = { ...customer };
console.log('\n=== Copy (shallow) ===');
console.log(copy);
console.log('Are they the same object?', customer === copy); // false

// ===== UPDATE: Change city and add phone =====
const updatedCustomer = {
    ...customer,
    city: 'Bahir Dar',
    phone: '+251911234567'
};

console.log('\n=== Updated Customer ===');
console.log(updatedCustomer);

console.log('\n=== Original is Unchanged ===');
console.log(customer);

// ===== UPDATE: Correct amount (for transactions) =====
const transaction = {
    id: 101,
    customer: 'Almaz',
    amount: 250,
    type: 'debit'
};

console.log('\n=== Transaction ===');
console.log(transaction);

const correctedTransaction = {
    ...transaction,
    amount: 250.50
};

console.log('\n=== Corrected Transaction ===');
console.log(correctedTransaction);
console.log('Original transaction is unchanged:', transaction);