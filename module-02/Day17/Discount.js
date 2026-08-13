// ===== FACTORY FUNCTION =====
function discountBy(rate) {
    return function(price) {
        return price * (1 - rate);
    };
}

// Create specialized discount functions
const memberPrice = discountBy(0.10);   // 10% discount
const salePrice = discountBy(0.30);     // 30% discount
const holidayPrice = discountBy(0.25);  // 25% discount

const price = 1000; // ETB

console.log("=== Original Price: 1000 ETB ===");
console.log("Member Price (10% off):", memberPrice(price));     // 900
console.log("Sale Price (30% off):", salePrice(price));         // 700
console.log("Holiday Price (25% off):", holidayPrice(price));   // 750

console.log("\n=== Multiple Items ===");
console.log("Teff (250 ETB) - Member Price:", memberPrice(250));    // 225
console.log("Coffee (350 ETB) - Sale Price:", salePrice(350));      // 245
console.log("Injera (180 ETB) - Holiday Price:", holidayPrice(180)); // 135

// Each closure captures and remembers its own rate!