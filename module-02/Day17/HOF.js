// ===== HIGHER-ORDER FUNCTION =====
function applyToAll(list, fn) {
    const results = [];
    for (let i = 0; i < list.length; i++) {
        results.push(fn(list[i]));
    }
    return results;
}

// ===== PURE FUNCTIONS =====
const addVat = (price) => price * 1.15;           // Add 15% VAT
const halfPrice = (price) => price * 0.5;         // 50% off
const toEtb = (price) => price + ' ETB';          // Format as ETB

const prices = [250, 500, 180, 320, 1000];

console.log("=== Original Prices ===");
console.log(prices);

console.log("\n=== Apply VAT (15%) ===");
const withVat = applyToAll(prices, addVat);
console.log(withVat);

console.log("\n=== Apply 50% Discount ===");
const discounted = applyToAll(prices, halfPrice);
console.log(discounted);

console.log("\n=== Apply VAT then Format ===");
const formatted = applyToAll(prices, (price) => {
    return Math.round(price * 1.15 * 100) / 100 + ' ETB';
});
console.log(formatted);

console.log("\n=== Chain: VAT → Discount → Format ===");
const result = applyToAll(
    applyToAll(prices, addVat),
    (price) => {
        const discounted = price * 0.5;
        return Math.round(discounted * 100) / 100 + ' ETB';
    }
);
console.log(result);