// Selecting Elements
const formTask = document.querySelector("form");
const inputTask = document.querySelector("#input");
const list = document.querySelector("#list");
const itemNum = document.querySelector('.items-number');
const active = document.querySelector('.active');
const completed = document.querySelector('.complated');
const clearCompleted = document.querySelector('.clear-complated');
const all = document.querySelector('.all');
const darkLight = document.querySelector('.dark-light__icon');

// Load Todos from Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Regex for validation (Min 3, Max 40 characters)
const regEx = /^.{3,40}$/;

// Function to Render Todos
function renderTodos(array) {
    list.innerHTML = "";
    if (array.length > 0) {
        array.forEach((element, index) => {
            list.innerHTML += `
                <li>
                    <div class="todo-message">
                        <span class="${element.completed ? "active" : ""}" onclick="toggleComplete(${index})">
                            <img src="./images/icon-check.svg" alt="" class="dark-check">
                            <img src="./images/icon-check copy.svg" alt="" class="light-check">
                        </span>
                        <div>${element.title}</div>
                    </div>
                    <button class="btn" onclick="deleteTodo(${index})">
                        <img src="./images/icon-cross.svg" alt="">
                    </button>
                </li>
            `;
        });
    } else {
        list.innerHTML = `<div style="text-align: center; padding: 15px;" class="not-found">No tasks found</div>`;
    }
    updateItemCount();
}

// Function to Add New Todo
function addTodo(message) {
    const newTodo = {
        title: message,
        completed: false
    };
    todos.push(newTodo);
    saveAndRender();
}

// Function to Delete Todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
}

// Function to Toggle Task Completion
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

// Function to Filter & Show Completed Todos
function showCompleted() {
    renderTodos(todos.filter(todo => todo.completed));
}

// Function to Filter & Show Active Todos
function showActive() {
    renderTodos(todos.filter(todo => !todo.completed));
}

// Function to Clear Completed Todos
function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
}

// Function to Update Task Counter
function updateItemCount() {
    itemNum.innerHTML = `${todos.filter(todo => !todo.completed).length} items left`;
}

// Function to Save & Re-render
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// Event Listener for Adding Tasks
formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskValue = inputTask.value.trim();
    if (regEx.test(taskValue)) {
        addTodo(taskValue);
    }
    formTask.reset();
});

// Event Listeners for Filtering
completed.addEventListener('click', showCompleted);
active.addEventListener('click', showActive);
clearCompleted.addEventListener('click', clearCompletedTodos);
all.addEventListener('click', () => renderTodos(todos));

// Dark-Light Mode Toggle
darkLight.addEventListener('click', () => {
    document.body.classList.toggle("active");
});

// Initial Render
renderTodos(todos);
