// Selecting DOM Elements
const title = document.getElementById("title");
const input = document.getElementById("todo-input");
const btn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const label = document.getElementById("label");
const search = document.getElementById("search");

// Set the date to the title
const date = new Date().toString().slice(0, 15);
title.textContent = `Today is ${date}`;

// Create Button
function createButton(type, color, value) {
  // create
  const button = document.createElement("button");
  // add class
  button.classList.add(`${type.toLowerCase()}-btn`);
  // add text button
  button.textContent = `${type}`;
  // add color
  button.style.backgroundColor = `${color}`;
  button.setAttribute("value", `${value}`);
  // STYLING
  button.style.height = "2rem";
  button.style.width = "5rem";
  button.style.border = "none";
  button.style.borderRadius = "1rem";
  button.style.margin = "1rem";
  button.style.fontFamily = "Playpen Sans";
  button.style.cursor = "pointer";
  return button;
}

// Create checkbox
function checkbox() {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  // checkbox.setAttribute("id", "check");
  checkbox.style.margin = "10px";
  return checkbox;
}

// Style input field
function required(str, color, cursor) {
  label.textContent = str;
  label.style.color = color;
  input.style.borderColor = color;
  btn.style.cursor = cursor;
}

export {
  createButton,
  checkbox,
  required,
  title,
  input,
  btn,
  list,
  label,
  search,
  date,
};
