const title = document.getElementById("title");

// Set the date to the title
const date = new Date().toString().slice(0, 15);
title.textContent = `Today is ${date}`;

// Create Button
function createButton(type, color) {
  // create
  const button = document.createElement("button");
  // add class
  button.classList.add(`${type.toLowerCase()}-btn`);
  // add text button
  button.innerHTML = `${type}`;
  // add color
  button.style.backgroundColor = `${color}`;
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

// Style input field
function required(str, color, cursor) {
  label.textContent = str;
  label.style.color = color;
  input.style.borderColor = color;
  btn.style.cursor = cursor;
}

export { createButton, required, title, date };
