// ===== EXERCISE 2: Object.entries =====

const customer = {
    name: 'Almaz Bekele',
    city: 'Addis Ababa',
    balance: 1500
};

console.log('=== Customer Object ===');
console.log(customer);

console.log('\n=== Using Object.entries ===');
for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
}

console.log('\n=== Using Object.keys ===');
for (const key of Object.keys(customer)) {
    console.log(`${key}: ${customer[key]}`);
}

console.log('\n=== Using Object.values ===');
for (const value of Object.values(customer)) {
    console.log(value);
}