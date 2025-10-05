const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const errorMsg = document.getElementById("error-msg");

let todos = [];
let completedCount = 0;

addBtn.addEventListener("click", addTodo);
list.addEventListener("click", handleListClick);

function addTodo() {
  const text = input.value.trim();

  if (text === "") {
    showError("Input must not be empty!");
    return;
  }

  const todo = { text, completed: false };
  todos.push(todo);
  renderTodos();

  input.value = "";
  hideError();
}

function handleListClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.parentElement.dataset.index;
    todos.splice(index, 1);
    renderTodos();
  } else if (e.target.tagName === "LI") {
    const index = e.target.dataset.index;
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
}

function renderTodos() {
  list.innerHTML = "";
  completedCount = todos.filter(todo => todo.completed).length;

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.dataset.index = index;
    if (todo.completed) li.classList.add("completed");

    const del = document.createElement("span");
    del.textContent = "🗑️";
    del.classList.add("delete-btn");
    li.appendChild(del);

    list.appendChild(li);
  });

  counter.textContent = `${completedCount} completed`;
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
  errorMsg.classList.add("blink");
}

function hideError() {
  errorMsg.style.display = "none";
  errorMsg.textContent = "";
}