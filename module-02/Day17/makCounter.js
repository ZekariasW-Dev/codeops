// ===== CLOSURE: Private Counter =====
function makeCounter() {
    let count = 0; // PRIVATE - cannot be accessed from outside

    return function() {
        count++;
        return count;
    };
}

// Create two independent counters
const counter1 = makeCounter();
const counter2 = makeCounter();

console.log("=== Counter 1 ===");
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

console.log("\n=== Counter 2 (Independent) ===");
console.log(counter2()); // 1
console.log(counter2()); // 2

console.log("\n=== Counter 1 (Remembers its state) ===");
console.log(counter1()); // 4

/*
    ===== WHY count STAYS PRIVATE =====
    
    - count is declared inside makeCounter
    - It is NOT returned and NOT attached to any global
    - The inner function "closes over" count (closure)
    - Nothing outside can read or change count directly
    
    You CANNOT do:
    - counter1.count (undefined)
    - counter1.count = 100 (does nothing)
    
    The only way to interact with count is through the returned function.
*/

console.log("\n=== Proof: count is private ===");
console.log(counter1.count); // undefined