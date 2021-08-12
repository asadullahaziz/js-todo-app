function getTodos() {
    let todosString = localStorage.getItem("todos");

    if (todosString !== null) {
        return JSON.parse(todosString);
    }
    else {
        return [];
    }
}

function saveTodos(todos) {
    let todosString = JSON.stringify(todos);
    localStorage.clear();
    localStorage.setItem("todos", todosString);
}

// Display Todos
function displayTodos(todos) {
    const todosDiv = document.querySelector("#todos");
    // empty todos div
    todosDiv.innerHTML = "";

    todos.forEach(function (todo) {
        let todoDiv = document.createElement("div");
        todoDiv.className += "todo";
        todoDiv.innerHTML = `
        <button type="button" class="delete btn btn-danger btn-sm" style="padding:2px 3px; line-height:.8;">X</button>
        <input class="completed form-check-input" type="checkbox">
        <span class="form-check-label"></span>
        `;
        let todoLabel = todoDiv.querySelector("span");
        let todoCheckbox = todoDiv.querySelector(".completed");
        let delteTodo = todoDiv.querySelector(".delete");

        todoLabel.innerText = todo.text;
        todoCheckbox.checked = todo.completed;

        // delete button event listener
        delteTodo.addEventListener("click", function () {
            deleteTodo(todo.id);
            saveTodos(Todos);
            renderTodos(Todos);
        });

        // checkbox event listner
        todoCheckbox.addEventListener("change", function () {
            todoIndex = Todos.findIndex(function (t) {
                return todo.id === t.id;
            });
            if (todoIndex > -1) {
                Todos[todoIndex].completed = !Todos[todoIndex].completed;
            }
            saveTodos(Todos);
            showSummary();
        });

        todosDiv.appendChild(todoDiv);
        showSummary();
    });
}

// healper functions
function renderTodos(todos, text = "") {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(text.toLowerCase());
    });

    displayTodos(filteredTodos);
}

function renderIncompleteTodos() {
    let notCompleted = Todos.filter(function (todo) {
        return !todo.completed;
    });

    displayTodos(notCompleted);
}

// summary
function showSummary() {
    let notCompleted = Todos.filter(function (todo) {
        return !todo.completed;
    });

    // show summary
    document.querySelector("#summary").innerText = `You have ${notCompleted.length} left to do`;
}

// delete a todo object from array
function deleteTodo(id) {
    delIndex = Todos.findIndex(function (t) {
        return id === t.id;
    });
    if (delIndex > -1) {
        Todos.splice(delIndex, 1);
    }
}