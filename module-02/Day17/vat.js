// ===== FUNCTION DECLARATION with default parameter =====
function vat(amount, rate = 0.15) {
    return amount * rate;
}

console.log("VAT on 1000 ETB (default 15%):", vat(1000));        // 150
console.log("VAT on 1000 ETB (7%):", vat(1000, 0.07));           // 70

// ===== ARROW FUNCTION with implicit return =====
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("VAT on 1000 ETB (default 15%):", vatArrow(1000));   // 150
console.log("VAT on 1000 ETB (7%):", vatArrow(1000, 0.07));      // 70

// ===== PRICE INCLUDING VAT =====
function priceWithVat(amount, rate = 0.15) {
    return amount + (amount * rate);
}

console.log("1000 ETB + 15% VAT =", priceWithVat(1000));         // 1150