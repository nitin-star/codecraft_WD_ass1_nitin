document.addEventListener('DOMContentLoaded', (event) => {
    const todoForm = document.getElementById('todo-form');
    const todoTitle = document.getElementById('todo-title');
    const todoDescription = document.getElementById('todo-description');
    const todosDiv = document.getElementById('todos');

    function getTodos() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos() {
        todosDiv.innerHTML = '';
        const todos = getTodos();
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todosDiv.appendChild(todoItem);
        });
    }

    function handleAddTodo() {
        const title = todoTitle.value;
        const description = todoDescription.value;

        if (title && description) {
            const todos = getTodos();
            todos.push({ title, description });
            saveTodos(todos);
            displayTodos();
            todoForm.reset();
        }
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddTodo();
    });

    window.deleteTodo = function(index) {
        const todos = getTodos();
        todos.splice(index, 1);
        saveTodos(todos);
        displayTodos();
    }

    displayTodos();
});
