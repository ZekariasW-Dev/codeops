// ===== EXERCISE 3: Destructuring =====

const customer = {
    name: 'Almaz Bekele',
    city: 'Addis Ababa',
    balance: 1500,
    isMember: true
};

// ===== DESTRUCTURE OBJECT =====
const { name, city } = customer;
console.log('Destructured name:', name);
console.log('Destructured city:', city);

// ===== WITH DEFAULTS =====
const { phone = 'N/A' } = customer;
console.log('Phone (default):', phone);

// ===== RENAME =====
const { name: fullName } = customer;
console.log('Renamed to fullName:', fullName);

// ===== FUNCTION WITH PARAMETER DESTRUCTURING =====
function greet({ name }) {
    return `Selam, ${name}!`;
}

console.log('\nGreeting:', greet(customer));

// ===== WITH DEFAULT =====
function greetWithDefault({ name = 'Guest' }) {
    return `Selam, ${name}!`;
}

console.log('Greeting (with default):', greetWithDefault({}));

// ===== NESTED DESTRUCTURING =====
const user = {
    name: 'Dawit',
    address: {
        city: 'Gondar',
        zone: 'Arada',
        street: '123 Main'
    }
};

const { address: { city: userCity, zone } } = user;
console.log('\nNested destructuring:');
console.log('City:', userCity);
console.log('Zone:', zone);