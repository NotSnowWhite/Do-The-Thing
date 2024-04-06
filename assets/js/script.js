// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// modal script for buttons and modal
const modal = document.getElementsByClassName('.modal');
const exitButton = document.getElementsByClassName('close');
const modalButton = document.getElementsByClassName('btn');


// makes exit button remove modal
exitButton.onclick = function () {
    modal.style.display = 'none';
}

// function to call form on submit 
const form = document.querySelector('Form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').val();
    console.log(taskTitle);
    modal.style.display = 'none'
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomNum = Math.floor(Math.random() * 1001);
    return randomNum;
}
id = generateTaskId();
console.log(id);
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card project-card draggable my-3').attr('data-task-id', task.id);
    const cardTitle = $('<div>').addClass('card-title h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-description').text(task.type);
    const cardDueDate = $('<p>').addClass('card-duedate').text(task.dueDate);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
        }
    }

    cardBody.append(cardDescription, cardDueDate);
    taskCard.append(cardTitle, cardBody);

    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
