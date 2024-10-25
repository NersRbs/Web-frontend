const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleComplete(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add("delete-button")
        deleteButton.addEventListener('click', () => deleteTodo(index));

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    todos.push({ text, completed: false });
    updateLocalStorage();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateLocalStorage();
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    updateLocalStorage();
    renderTodos();
}

todoForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text !== '') {
        addTodo(text);
        todoInput.value = '';
    }
});

window.onload = renderTodos;
