// what is missing here :
// 1. Edit function
// 2. create checkbox ********************* DONE
// 3. count the completed todos
// 4. strikthrough todo if completed ************* DONE
// 5. Modify search function if no todo what should show
// 6. Modify enter key event for add todo
let editBtn = document.querySelectorAll(".edit-btn");
// importing
import {
  createButton,
  checkbox,
  input,
  btn,
  list,
  label,
  search,
  required,
} from "./style.js";

// Create empty list to push into it
let todo = [];

// Create todo
function createTodo(newTodo) {
  // Make sure the user type somthing
  if (newTodo.length > 0) {
    // add todo to array
    todo.push(newTodo);

    // list all todos
    listTodo(todo);
    required("Click Add", "black", "pointer");
    // to save todo list into storage
    localStorage.setItem("todo", JSON.stringify(todo)); // clear the input
    input.value = "";
  } else {
    required("please type something", "red", "not-allowed");
  }
}

// Edit todo
function editTodo(todo, index) {
  label.textContent = "Editing ... press Enter after you done from editing";
  let updatedItems = [];
  // select all labels
  const item = document.querySelectorAll("label");
  // make sure the index is in the range of todo array
  if (index >= 0 && index < todo.length) {
    // put the label into input box
    input.value = item[index].textContent;
    // put the curser inside input box
    input.focus();
    // When press Enter (the problem is here)
    input.addEventListener("keypress", (e) => {
      if (e.code == "Enter") {
        // CHANGING
        // e.target.value = "done";
        // if (e.target.value == "done") {
        //   e.target.style.backgroundColor = "green";
        //   e.target.textContent = "Done";
        // } else {
        //   e.target.style.backgroundColor = "#FFF6F6";
        //   e.target.textContent = "Edit";
        // }

        // END OF CHANGING

        // take the new value from input box & put to label textContent
        item[index].textContent = input.value;
        // add the new values to the new array
        updatedItems.push(item[index].textContent);
        // switch values between old & new array
        todo[index] = updatedItems[index];
        // update todo list storage
        localStorage.setItem("todo", JSON.stringify(todo));
        // show the list
        listTodo(todo);
        // Reset will cause <empty string> in console
        // input.value = "";
        label.textContent = "Click Add";
      }
    });
  } else console.log("Index not available");
}
// Delete todo
function deleteTodo(todo, index) {
  // make sure the index is in the range of array
  // if (index >= 0 && index < todo.length) {
  // splice take the index & how many element will be deleted after that index
  todo.splice(index, 1);
  // show the remain list
  listTodo(todo);
  // to save todo list into storage
  localStorage.setItem("todo", JSON.stringify(todo));
  // show the remain list
  listTodo(todo);
  // } else console.log("Index not available");
}

// Show todo
function listTodo(todo) {
  // without this line, the list will repeate
  list.innerHTML = "";
  for (let index = 0; index < todo.length; index++) {
    // editBtn.setAttribute("id", `edit-${index}`);
    // create the li
    const itemList = document.createElement("li");
    // create label for checkbox
    const labelCheck = document.createElement("label");
    // Call check function
    const checkFunction = checkbox();
    // Add attribute for label
    labelCheck.setAttribute("for", `item-${index}`);
    ///// CHECKBOX
    itemList.appendChild(checkFunction).addEventListener("click", () => {
      check(index);
    });
    // set the content of check label to the todo
    labelCheck.textContent = todo[index];
    // add li to ul
    list.appendChild(itemList);
    // add check label to li
    itemList.appendChild(labelCheck);

    // Set different id for each item
    checkFunction.setAttribute("id", `item-${index}`);
    ///// EDIT
    itemList
      // add it to the page next to list item
      .appendChild(createButton("Edit", "#FFF6F6", "edit"))
      // Event
      .addEventListener("click", () => {
        editTodo(todo, index);
      });

    ///// Delete
    itemList
      .appendChild(createButton("Delete", "#F875AA", "delete"))
      .addEventListener("click", () => {
        deleteTodo(todo, index);
      });
  }
}
// Check
function check(index) {
  let count = 0;
  // Select all checkboxes
  const checkElement = document.querySelectorAll(`#item-${index}`);
  // Loop over checkboxes
  for (index = 0; index < checkElement.length; index++) {
    // Select label of checkbox
    const checkSibling = checkElement[index].nextElementSibling;
    // check if the checkbox is checked then style the labels
    if (checkElement[index].checked) {
      checkSibling.style.textDecoration = "line-through";
      checkSibling.style.textDecorationThickness = ".2rem";
      checkSibling.style.textDecorationColor = "red";
      checkElement[index].style.accentColor = "green";
    } else {
      checkSibling.style.textDecoration = "none";
    }
  }
}

// Search
function searchTodo(word) {
  // make sure the search word has no spaces & capital letters
  const searchWord = word.toLowerCase().trim();
  // filter
  const result = todo.filter((item) => item.includes(searchWord));
  if (result)
    // show the result
    listTodo(result);
  else {
    const p = document.createElement(p);
    p.textContent = "Nothing found";
    list.appendChild(p);
  }
}

// EVENTS
// Add Button Event
btn.addEventListener("click", () => {
  // take the todo from the text input
  createTodo(input.value);
  // put the curser into input box
  input.focus();
});

// Enter Key Event for create todo
// const enterKeyEvent =

//   function countClicks() {
//     // Counter for edit btn
//     let btnCounter = 0;
//   }
//   return btnCounter;
// }

// input.addEventListener("keypress", (e) => {
//   if (e.code == "Enter" && countClicks() == 0) {
//     createTodo(input.value);
//   }
// });

// Search Event Listener
search.addEventListener("keyup", () => {
  searchTodo(search.value);
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
