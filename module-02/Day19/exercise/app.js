//q1
const h1 =document.querySelector("h1");
h1.textContent = "New Exercise";
h1.classList.toggle("color");
//q2
const citys = ["Addis Ababa", "Bahir Dar", "Gondar", "Mekelle", "Hawassa"];
const ul = document.querySelector("ul");
citys.forEach(citys =>{
    const item = document.createElement("li");
    item.textContent = citys;
    ul.appendChild(item);
})
//q3
const button =document.querySelector("button");
const wrap = document.querySelector(".wrap");
button.addEventListener("click", (event) => {
  console.log("Button clicked:", event.target);
});
wrap.addEventListener("click", (event) => {
  console.log("Wrapper clicked:", event.target);
});
//q4
const list = document.querySelector("#item");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const item = event.target.closest("li");
    item.remove();
  }
});
//q5
const form = document.querySelector("form");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (!value) return;

  const item = document.createElement("li");
  item.textContent = value;

  list.appendChild(item);
  input.value = "";
  input.focus();
});