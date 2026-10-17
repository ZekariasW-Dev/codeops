const themeButton = document.querySelector("#theme-btn");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "Dark Mode";
    }
});


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "Light Mode";
}