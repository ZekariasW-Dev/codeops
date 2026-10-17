
const state = {
    routes: [],
    favourites: [],
    search: "",
    sort: "default",
    selectedRoute: null
};

const routesEl = document.querySelector("#routes");
const searchEl = document.querySelector("#search");
const sortEl = document.querySelector("#sort");
const favouritesEl = document.querySelector("#fav-list");


async function loadRoutes() {
    routesEl.innerHTML = "<p>Loading routes...</p>";

    try {
        const response = await fetch("routes.json");

        if (!response.ok) {
            throw new Error("Did not load");
        }

        state.routes = await response.json();
        render();
    } catch (error) {
        routesEl.innerHTML = "<p>Could not load bus routes.</p>";
    }
}

function render() {
    const term = state.search.toLowerCase();
    const shown = state.routes.filter(route =>
        route.route.toLowerCase().includes(term) ||
        route.start.toLowerCase().includes(term) ||
        route.destination.toLowerCase().includes(term)
    );

    if (state.sort === "price-asc") {
        shown.sort((firstRoute, secondRoute) => firstRoute.fare - secondRoute.fare);
    } else if (state.sort === "price-desc") {
        shown.sort((firstRoute, secondRoute) => secondRoute.fare - firstRoute.fare);
    } else if (state.sort === "name-asc") {
        shown.sort((firstRoute, secondRoute) => firstRoute.route.localeCompare(secondRoute.route));
    } else if (state.sort === "name-desc") {
        shown.sort((firstRoute, secondRoute) => secondRoute.route.localeCompare(firstRoute.route));
    }

    routesEl.innerHTML = shown.length ? shown.map(route => `
        <article class="route-card" data-id="${route.id}">
            <h3>${route.route}</h3>
            <p>From: ${route.start}</p>
            <p>To: ${route.destination}</p>
            <p>Bus: ${route.bus}</p>
            <p>Fare: ${route.fare} ETB</p>
            ${state.selectedRoute === route.id ? `
                <div class="route-preview" aria-live="polite">
                    <span>${route.start}</span>
                    <span class="route-line" aria-hidden="true"></span>
                    <span>${route.destination}</span>
                </div>
                <p class="route-estimate">
                    Estimated distance: ${estimateDistance(route)} km<br>
                    Estimated time: ${estimateTime(route)} minutes
                </p>
                <a
                    class="map-link"
                    href="${getMapUrl(route)}"
                    target="_blank"
                    rel="noopener"
                >Open in Google Maps</a>
            ` : ""}
            <button class="show-route" type="button">
                ${state.selectedRoute === route.id ? "Hide route" : "Show route"}
            </button>
            <button class="save" type="button">
                ${state.favourites.includes(route.id) ? "Saved" : "Save"}
            </button>
        </article>
    `).join("") : "<p>No routes found.</p>";

    const favourites = state.routes.filter(route =>
        state.favourites.includes(route.id)
    );

    favouritesEl.innerHTML = favourites.length ? favourites.map(route => `
        <li data-id="${route.id}">
            ${route.route}
            <button class="remove" type="button">Remove</button>
        </li>
    `).join("") : "<li>No saved routes.</li>";
}

function getDistanceInKm(startLocation, destinationLocation) {
    const earthRadiusKm = 6371;
    const latDifference = (destinationLocation.lat - startLocation.lat) * Math.PI / 180;
    const lngDifference = (destinationLocation.lng - startLocation.lng) * Math.PI / 180;
    const startLatitude = startLocation.lat * Math.PI / 180;
    const destinationLatitude = destinationLocation.lat * Math.PI / 180;
    const a = Math.sin(latDifference / 2) ** 2 +
        Math.cos(startLatitude) * Math.cos(destinationLatitude) *
        Math.sin(lngDifference / 2) ** 2;

    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateDistance(route) {
    const straightLineDistance = getDistanceInKm(
        route.startLocation,
        route.destinationLocation
    );

    return (straightLineDistance * 1.25).toFixed(1);
}

function estimateTime(route) {
    const averageBusSpeedKmh = 25;
    return Math.max(1, Math.round(Number(estimateDistance(route)) / averageBusSpeedKmh * 60));
}

function getMapUrl(route) {
    const origin = `${route.startLocation.lat},${route.startLocation.lng}`;
    const destination = `${route.destinationLocation.lat},${route.destinationLocation.lng}`;

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
}

function saveFavourites() {
    localStorage.setItem("sheger-favourites", JSON.stringify(state.favourites));
}

function loadFavourites() {
    const saved = localStorage.getItem("sheger-favourites");

    if (saved) {
        try {
            state.favourites = JSON.parse(saved);
        } catch (error) {
            state.favourites = [];
        }
    }
}

searchEl.addEventListener("input", event => {
    state.search = event.target.value.trim();
    render();
});

sortEl.addEventListener("change", event => {
    state.sort = event.target.value;
    render();
});

routesEl.addEventListener("click", event => {
    if (event.target.classList.contains("show-route")) {
        const routeId = Number(event.target.closest(".route-card").dataset.id);
        state.selectedRoute = state.selectedRoute === routeId ? null : routeId;
        render();
        return;
    }

    if (!event.target.classList.contains("save")) {
        return;
    }

    const routeId = Number(event.target.closest(".route-card").dataset.id);
    if (!state.favourites.includes(routeId)) {
        state.favourites.push(routeId);
    }

    saveFavourites();
    render();
});

favouritesEl.addEventListener("click", event => {
    if (!event.target.classList.contains("remove")) {
        return;
    }

    const routeId = Number(event.target.closest("li").dataset.id);
    state.favourites = state.favourites.filter(id => id !== routeId);

    saveFavourites();
    render();
});

async function init() {
    loadFavourites();
    await loadRoutes();
}

init();