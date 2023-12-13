// what is missing here :
// 1. Edit function
// 2. create checkbox
// 3. count the completed todos
// 4. strikthrough todo if completed

// importing
import { createButton, required } from "./style.js";

// Selecting DOM Elements
const input = document.getElementById("todo-input");
const btn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const label = document.getElementById("label");
const search = document.getElementById("search");

// Create empty list to push into it
let todo = [];

// Create todo
function createTodo(newTodo) {
  // Make sure the user type somthing
  if (newTodo.length > 0) {
    // add todo to array
    todo.push(newTodo);
    // clear the input
    input.value = "";
    // list all todos
    listTodo(todo);
    required("You can press Enter", "black", "pointer");
    // to save todo list into storage
    localStorage.setItem("todo", JSON.stringify(todo));
  } else {
    required("please type something", "red", "not-allowed");
  }
}

// Edit todo ???????????ADD EVENT IS THE PROBLEM
function editTodo(todo, index) {
  // make sure the index is in the range of array
  if (index >= 0 && index < todo.length) {
    // put the li in input box
    input.value = todo[index];
    // put the curser inside input box
    input.focus();
    // console.log(todo[index]);
    todo[index] = input.value;

    // update todo list storage
    localStorage.setItem("todo", JSON.stringify(todo));

    // show the list
    listTodo(todo);
  } else console.log("Index not available");
}

// Delete todo
function deleteTodo(todo, index) {
  // make sure the index is in the range of array
  if (index >= 0 && index < todo.length) {
    // splice take the index & how many element will be deleted after that index
    const item = todo.splice(index, 1);
    // show the remain list
    listTodo(todo);
    // to save todo list into storage
    localStorage.setItem("todo", JSON.stringify(todo));
    // show the remain list
    listTodo(todo);
  } else console.log("Index not available");
}

// Show todo
function listTodo(todo) {
  // without this line, the list will repeate
  list.innerHTML = "";
  for (let index = 0; index < todo.length; index++) {
    // create the li
    const itemList = document.createElement("li");
    // set the content of li to the todo
    itemList.textContent = todo[index];
    // add li to ul
    list.appendChild(itemList);
    ///// CHECKBOX

    ///// EDIT
    itemList
      // add it to the page next to list item
      .appendChild(createButton("Edit", "#FFF6F6"))
      // Event
      .addEventListener("click", () => {
        editTodo(todo, index);
        // editBtn.classList.toggle("done-btn");
      });

    ///// Delete
    itemList
      .appendChild(createButton("Delete", "#F875AA"))
      .addEventListener("click", () => {
        deleteTodo(todo, index);
      });
  }
}

// Search
function searchTodo(word) {
  // make sure the search word has no spaces & capital letters
  const searchWord = word.toLowerCase().trim();
  // filter
  const result = todo.filter((item) => item.includes(searchWord));
  // show the result
  listTodo(result);
}

// EVENTS

// Add Button Event
btn.addEventListener("click", () => {
  // take the todo from the text input
  createTodo(input.value);
});

// Enter Key Event for create todo
input.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    createTodo(input.value);
  }
});

// Enter Key Event for search todo
search.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    searchTodo(search.value);
  }
});

// Live Text Event
input.addEventListener("input", () => {
  label.innerText = input.value;
  label.style.color = "black";
  // required("You can press Enter", "black", "pointer");
});

// inspect > Storage > Local Storage
// Local Storage to make sure the list is not gone after refresh the page
const todosLocal = JSON.parse(localStorage.getItem("todo"));
if (todosLocal) {
  todo = todosLocal;
  listTodo(todo);
}
