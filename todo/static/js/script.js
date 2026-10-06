// Get elements
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");


// Get saved todos from Local Storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Show todos when page loads
displayTodos();


// ADD TODO
todoForm.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    const task = taskInput.value.trim();

    // Check empty input
    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    // Create todo
    const todo = {
        id: Date.now(),
        task: task
    };

    // Add todo to array
    todos.push(todo);

    // Save to Local Storage
    saveTodos();

    // Clear input
    taskInput.value = "";

    // Display todos
    displayTodos();
});


// DISPLAY TODOS
function displayTodos() {

    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        const todoItem = document.createElement("div");

        todoItem.className = "todo-item";

        todoItem.innerHTML = `
            <span>${todo.task}</span>

            <div>
                <button class="edit" onclick="editTodo(${todo.id})">
                    Edit
                </button>

                <button class="delete" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        todoList.appendChild(todoItem);
    });
}


// DELETE TODO
function deleteTodo(id) {

    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    saveTodos();

    displayTodos();
}


// EDIT TODO
function editTodo(id) {

    const todo = todos.find(function(todo) {
        return todo.id === id;
    });

    const newTask = prompt("Edit your task:", todo.task);

    if (newTask === null) {
        return;
    }

    if (newTask.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    todo.task = newTask.trim();

    saveTodos();

    displayTodos();
}


// SAVE TODOS
function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}