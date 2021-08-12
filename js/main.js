let Todos = getTodos();

// filter
document.querySelector("#filter").addEventListener("input", function (e) {
    let filterText = e.target.value;
    renderTodos(Todos, filterText);
});

// clear todos from view event listner
// document.querySelector("#clear").addEventListener("click", function(e){
//     todosDiv.querySelectorAll("p").forEach(todo => todo.remove());
// });

// add a todo
document.querySelector("form#add").addEventListener("submit", function (e) {
    e.preventDefault();
    Todos.push({
        id: uuidv4(),
        text: e.target.elements.todo.value,
        completed: false
    });
    e.target.elements.todo.value = "";
    renderTodos(Todos);
    saveTodos(Todos);
});

// hide incomplete
document.querySelector("#hide").addEventListener("change", function (e) {
    if (e.target.checked) {
        renderIncompleteTodos();
    }
    else {
        renderTodos(Todos);
    }
});

// show incomplete
renderTodos(Todos);