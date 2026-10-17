// Select the elements from HTML
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const error = document.querySelector("#error");


// Add item when the form is submitted
form.addEventListener("submit", (e) => {

    // Stop the page from refreshing
    e.preventDefault();

    // Get the input values
    const itemName = nameInput.value.trim();
    const itemPrice = Number(priceInput.value);

    // Validate the inputs
    if (!itemName || !itemPrice || itemPrice <= 0) {
        error.textContent = "Please enter an item name and a valid price.";
        return;
    }

    // Clear error message
    error.textContent = "";

    // Add the item to the list
    addRow(itemName, itemPrice);

    // Clear the form
    form.reset();

    // Update the total
    updateTotal();
});


// Function to create and add a new row
function addRow(itemName, itemPrice) {

    // Create the list item
    const li = document.createElement("li");

    // Store the price inside the li
    li.dataset.price = itemPrice;

    // Create the text
    const span = document.createElement("span");

    // Put item name and price inside span
    span.textContent = `${itemName} - ${itemPrice} ETB`;

    // Create delete button
    const deleteButton = document.createElement("button");

    // Add text to button
    deleteButton.textContent = "Delete";

    // Add class to button
    deleteButton.classList.add("delete-btn");
    deleteButton.classList.add("del");

    // Put span and button inside li
    li.append(span, deleteButton);

    // Add li to the list
    list.append(li);
}


// Event delegation
list.addEventListener("click", (e) => {

    // Check if the Delete button was clicked
    if (e.target.matches(".del")) {

        // Find the parent li and remove it
        e.target.closest("li").remove();

        // Update the total
        updateTotal();
    }

    // Check if the list item itself was clicked
    else if (e.target.matches("li")) {

        // Toggle bought class
        e.target.classList.toggle("bought");
    }
});


// Function to calculate the total
function updateTotal() {

    let total = 0;

    // Get all list items
    const items = list.querySelectorAll("li");

    // Go through each item
    items.forEach((item) => {

        // Get its price
        const price = Number(item.dataset.price);

        // Add price to total
        total += price;
    });

    // Display the total
    totalEl.textContent = `${total} ETB`;
}