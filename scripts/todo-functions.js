
const renderTodos = function(todos,filters){
    
    let filteredTodos = todos.filter(function(item){
        return item.text.toLowerCase().includes(filters.searchText);
    })
    
    filteredTodos = filteredTodos.filter(function(item){
        return filters.hideCompleted ? !item.completed : true;
    })
    
    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    
    document.getElementById('todos').innerHTML = '' //clear div before render
    document.getElementById('todos').appendChild(generateSummary(incompleteTodos));    
    filteredTodos.forEach(function(todo){         
        document.getElementById('todos').appendChild(generateTodoDom(todo));   
    })
}

const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id;
    })

    if(todoIndex > -1){
        todos.splice(todoIndex,1);
        saveTodos(todos);
        renderTodos(todos,filters);
    }
}

const toggleTodo = function(id){
    const theTodo = todos.find(function(todo){
        return todo.id === id;
    })

    if(theTodo != undefined){
        theTodo.completed = !theTodo.completed
    }
}

const generateTodoDom = function(todo) {
    
    const container = document.createElement('div');
    

    //todo setup
    const todoText = document.createElement('span');    
    todoText.innerText = todo.text;
    
    // checkbox setup
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.checked = todo.completed
    checkBox.addEventListener('change',function(){
        toggleTodo(todo.id);
        saveTodos(todos,filters)
        renderTodos(todos,filters)
    })
    
    
    
    // deleteBtn setup
    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click',function(){
        removeTodo(todo.id);        
    })

    container.appendChild(checkBox);
    container.appendChild(todoText);
    container.appendChild(delBtn);

    return container;
}


const generateSummary = function(theTodos){
    const summary = document.createElement('h2');
    summary.textContent = `You have ${theTodos.length} todos left!`
    return summary
}

const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
}

const getTodos = function(){
    const todoData = localStorage.getItem('todos');
    if (todoData !== null){
       return JSON.parse(todoData);
    } else {
        return []
    }
}
