// ============================================================
// LOYALTY POINTS MODULE - TeleBirr Shop
// ============================================================

function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
    // PRIVATE STATE — cannot be accessed from outside
    let points = 0;

    // Return object with operations
    return {
        // Earn points based on amount spent
        earn: function(etb) {
            const earned = earnRule(etb);
            points += earned;
            console.log(`✅ Earned ${earned} points (${etb} ETB spent)`);
            return earned;
        },

        // Redeem points — never goes below zero
        redeem: function(p) {
            if (p > points) {
                const actual = points;
                console.log(`⚠️ Only ${points} points available. Redeeming ${actual}.`);
                points = 0;
                return actual;
            }
            points -= p;
            console.log(`🔻 Redeemed ${p} points`);
            return p;
        },

        // Getter — read-only access to balance
        balance: function() {
            return points;
        }
    };
}

// ============================================================
// DEMO 1: Standard Loyalty Card
// ============================================================

console.log('=== DEMO 1: Standard Loyalty Card ===');

const standardCard = createLoyalty();

// Update initial balance
document.getElementById('standard-initial').textContent = standardCard.balance();

standardCard.earn(250);   // 25 points
standardCard.earn(500);   // 50 points
standardCard.earn(180);   // 18 points

document.getElementById('standard-after-earn').textContent = standardCard.balance();

standardCard.redeem(30);
document.getElementById('standard-after-redeem').textContent = standardCard.balance();

standardCard.redeem(100);
document.getElementById('standard-final-balance').textContent = standardCard.balance();

// ============================================================
// DEMO 2: Holiday Card — Double Points
// ============================================================

console.log('\n=== DEMO 2: Holiday Card (Double Points) ===');

const holidayRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayRule);

document.getElementById('holiday-initial').textContent = holidayCard.balance();

holidayCard.earn(250);   // 50 points (double!)
holidayCard.earn(100);   // 20 points (double!)

document.getElementById('holiday-after-earn').textContent = holidayCard.balance();

// ============================================================
// DEMO 3: VIP Card — Triple Points
// ============================================================

console.log('\n=== DEMO 3: VIP Card (Triple Points) ===');

const vipRule = (etb) => Math.floor(etb / 10) * 3;
const vipCard = createLoyalty(vipRule);

document.getElementById('vip-initial').textContent = vipCard.balance();

vipCard.earn(250);   // 75 points (triple!)
vipCard.earn(100);   // 30 points (triple!)

document.getElementById('vip-after-earn').textContent = vipCard.balance();

// ============================================================
// DEMO 4: Proof of Privacy
// ============================================================

console.log('\n=== DEMO 4: Proof of Privacy ===');

document.getElementById('private-proof').textContent = typeof standardCard.points;

console.log('standardCard.points:', standardCard.points); // undefined
console.log('Cannot access points directly! 🔒');

// Each card has independent balance
document.getElementById('final-standard').textContent = standardCard.balance();
document.getElementById('final-holiday').textContent = holidayCard.balance();
document.getElementById('final-vip').textContent = vipCard.balance();

console.log('\n=== Final Balances ===');
console.log('Standard Card:', standardCard.balance());
console.log('Holiday Card:', holidayCard.balance());
console.log('VIP Card:', vipCard.balance());

// ============================================================
// WHY THE BALANCE IS PRIVATE (Comment in code)
// ============================================================

/*
    ===== WHY points STAYS PRIVATE =====
    
    The variable `points` is declared inside the `createLoyalty` function.
    It is NOT returned and NOT attached to any global object.
    
    The inner functions (earn, redeem, balance) "close over" the `points` 
    variable. This creates a CLOSURE.
    
    Because `points` is only accessible inside the closure, nothing 
    outside can read or change it directly.
    
    You CANNOT do:
    - standardCard.points (undefined)
    - standardCard.points = 100 (does nothing)
    
    The only way to interact with `points` is through the returned 
    functions: earn(), redeem(), and balance().
    
    This is how JavaScript creates PRIVATE state!
*/