const form = document.querySelector("#search-form");
const input = document.querySelector("#country");
const out = document.querySelector("#facts");


function render(parent, label, value) {

    const div = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = label + ": ";

    const text = document.createElement("span");
    text.textContent = value;

    div.appendChild(title);
    div.appendChild(text);

    parent.appendChild(div);
}


async function showCountry(name) {

    out.textContent = "Loading...";

    try {

        const res = await fetch(
            `https://restcountries.com/v3.1/name/${name}`
        );

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const [country] = await res.json();

        out.innerHTML = "";

        render(
            out,
            "Capital",
            country.capital[0]
        );

        render(
            out,
            "Population",
            country.population.toLocaleString()
        );

        render(
            out,
            "Region",
            country.region
        );

        const currencies = Object.values(country.currencies)
            .map(currency => currency.name)
            .join(", ");

        render(
            out,
            "Currencies",
            currencies
        );

        const flag = document.createElement("img");

        flag.src = country.flags.png;
        flag.alt = country.flags.alt || "Country flag";
        flag.width = 150;

        out.appendChild(flag);

    } catch (error) {

        out.textContent = error.message;
    }
}


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const countryName = input.value.trim();

    if (countryName === "") {
        out.textContent = "Please enter a country name.";
        return;
    }

    showCountry(countryName);
});


showCountry("ethiopia");