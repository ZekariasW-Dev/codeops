// ===== DATA =====
const ethiopianCities = [
    'Addis Ababa',
    'Bahir Dar',
    'Gondar',
    'Lalibela',
    'Axum',
    'Harar',
    'Dire Dawa',
    'Jimma'
];

console.log("=== Ethiopian Cities ===");

// ===== forEach with callback =====
ethiopianCities.forEach(function(city, index) {
    console.log((index + 1) + '. ' + city);
});

// ===== Using Arrow Function =====
console.log("\n=== Using Arrow Function ===");
ethiopianCities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});

// ===== With Emojis =====
console.log("\n=== With Emojis ===");
ethiopianCities.forEach((city, index) => {
    const number = index + 1;
    let emoji = '📍';
    if (city === 'Addis Ababa') emoji = '🏙️';
    else if (city === 'Bahir Dar') emoji = '🏞️';
    else if (city === 'Lalibela') emoji = '⛪';
    else if (city === 'Axum') emoji = '🏛️';
    console.log(`${number}. ${emoji} ${city}`);
});

// ===== Creating our own forEach =====
function myForEach(list, callback) {
    for (let i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
}

console.log("\n=== Using our own forEach ===");
myForEach(ethiopianCities, (city, index) => {
    console.log(`[${index}] ${city}`);
});