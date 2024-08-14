
const input = document.getElementById('todo-input');
const elementAppend = document.getElementById('todo-list');
let localTodoList = getTodoData(); //get data local storage globally.

function getTodoData() { //local storage get data function
    return JSON.parse(localStorage.getItem('TodoList')) || [];
};

function addTodoDaymiclElement(element) {
    const li = document.createElement('li');
    li.textContent = element; // Set trimmed value to list item

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    elementAppend.appendChild(li);
}

document.getElementById('add-button').addEventListener('click', (e) => {
    addTodoList(e)
});

function addTodoList() {
    const inputValue = input.value.trim();

    if (inputValue !== '') {
        if (!localTodoList.includes(inputValue)) { //duplicate value user ke add karne pe add nhi hogi.
            localTodoList.push(inputValue);
            localTodoList = [...new Set(localTodoList)]; //duplicate value nhi repit ho is liye set use speard oparetor ke sath local storage me.
            console.log(localTodoList);
            localStorage.setItem("TodoList", JSON.stringify(localTodoList)); //set todolist local storage me.

            addTodoDaymiclElement(inputValue); //dry code na ho is liye ye function use bus is me argumnet me inputValue diye hai

            input.value = ''; // Clear the input field
        }
    }
}

const showTodoList = () => { //first time page referace jo data save localstorge me o mile ga.
    console.log(localTodoList);
    localTodoList.forEach(curElement => {
        addTodoDaymiclElement(curElement);
    });
};
showTodoList();

elementAppend.addEventListener("click", (e) => {
    if (e.target.tagName === 'BUTTON') {
        if (e.target.textContent === 'Delete') {
            removeTodoList(e);
        } else if (e.target.textContent === 'Edit') {
            editTodoItem(e);
        }
    }
});

function removeTodoList(e) {
    const todoItem = e.target.parentNode; // The li element
    const todoText = todoItem.firstChild.textContent; // Get the text of the todo item

    // Remove the item from the localTodoList array local storage se itme bhi delete hoge.
    localTodoList = localTodoList.filter(item => item !== todoText);

    // Update local storage
    localStorage.setItem('TodoList', JSON.stringify(localTodoList));

    // Remove the item from the DOM
    elementAppend.removeChild(todoItem);
}

function editTodoItem(e) {
    const todoItem = e.target.parentNode; // The li element
    const todoText = todoItem.firstChild.textContent; // Get the text of the todo item
    input.value = todoText; // Set the value of the input to the text of the todo item
    input.focus(); // Focus on the input field
    removeTodoList(e); // Remove the todo item so it can be replaced with the edited version
}
