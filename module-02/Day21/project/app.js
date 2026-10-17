const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");

const PHONE = /^(?:\+251|0)9\d{8}$/;


// Check the form values
function validate(name, phone) {

    if (name.trim().length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid phone.";
    }

    return "";
}


// Save people
function save(people) {

    localStorage.setItem(
        "signup-people",
        JSON.stringify(people)
    );
}


// Load people
function load() {

    const saved = localStorage.getItem("signup-people");

    if (saved === null) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


// Update number of people
function updateCount() {

    const people = load();

    count.textContent =
        people.length + " people have signed up.";
}


// Form submit
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const message = validate(name, phone);

    if (message !== "") {

        error.textContent = message;

        return;
    }

    const people = load();

    people.push({
        name: name,
        phone: phone
    });

    save(people);

    form.reset();

    error.textContent = "Signup successful.";

    updateCount();
});


// Show saved count when page loads
updateCount();