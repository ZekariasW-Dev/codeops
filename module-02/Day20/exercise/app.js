const status = document.querySelector("#status");

async function loadUser() {

    status.textContent = "Loading...";

    try {

        const res = await fetch(
            "https://api.jsonplaceholder.dev/users/1"
        );

        if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
        }

        const user = await res.json();

        status.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
        `;

    } catch (error) {

        status.textContent =
            "Error loading user: " + error.message;
    }
}

loadUser();