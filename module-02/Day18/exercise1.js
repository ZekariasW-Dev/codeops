// ===== EXERCISE 1: map, filter, reduce =====

const prices = [250, 600, 180, 900, 1200, 450]; // ETB

// 1. Add 15% VAT using map
const withVat = prices.map(price => price * 1.15);
console.log('Prices with VAT:', withVat);

// 2. Filter to keep those under 1000
const under1000 = withVat.filter(price => price < 1000);
console.log('Under 1000 ETB:', under1000);

// 3. Reduce to grand total
const grandTotal = under1000.reduce((sum, price) => sum + price, 0);
console.log('Grand Total:', grandTotal);

// ===== CHAINED VERSION =====
const result = prices
    .map(price => price * 1.15)
    .filter(price => price < 1000)
    .reduce((sum, price) => sum + price, 0);

console.log('\nChained Result:', result);