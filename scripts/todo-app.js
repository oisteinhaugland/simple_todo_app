//remove all ps with "the" in text;
let todos = getTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos,filters);

document.getElementById('searchTodoField').addEventListener('input',function(e){
    filters.searchText = e.target.value.toLowerCase(); //update filter
    renderTodos(todos,filters);
})

document.getElementById('todoForm').addEventListener('submit',function(e){ //add todo
    e.preventDefault();
    
    const textFieldValue = e.target.elements.todo.value
    
    todos.push({ //new todo
        id: uuidv4(),
        text: textFieldValue,
        completed: false
    });
    
    e.target.elements.todo.value = ''; //clear input.
    saveTodos(todos);
    renderTodos(todos,filters);
});

document.getElementById('filterCompleted').addEventListener('change',function(e){
    filters.hideCompleted = e.target.checked; // toggle hide completed
    renderTodos(todos,filters);
})


renderTodos(todos,filters)
