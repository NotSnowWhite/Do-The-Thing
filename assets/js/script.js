// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const title = $('#taskTitle');
const dueDate = $('#dueDate');
const description = $('#description');
// modal script for buttons and modal
const modal = $('.modal');
const exitButton = $('.close');
const modalButton = $('.btn');


// makes exit button remove modal
exitButton.click(function () {
    modal.hide();
});

// function to call form on submit 
const form = document.querySelector('Form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskTitle = $('#taskTitle').val();
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
    const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', task.id);
    const cardBody = $('<div>').addClass('card-body');
    const cardTitle = $('<div>').addClass('card-title h4').text(task.name);
    const cardDescription = $('<p>').addClass('card-description').text(task.title);
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

function storeTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
      if (!tasks) {
      tasks = [];
    }
  
    return tasks;
  }
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();

    for (let tasks of tasks) {
        if (tasks.status === 'to-do') {
          todoList.append(createTaskCard(tasks));
        } else if (tasks.status === 'in-progress') {
          inProgressList.append(createTaskCard(tasks));
        } else if (tasks.status === 'done') {
          doneList.append(createTaskCard(tasks));
        }
      }

    const tasks = storeTasks()
        $( "#draggable" ).draggable();
        zIndex: 100,
      };


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
        event.preventDefault();
        const taskTitle = title.val().trim();
        const taskDue = dueDate.val();
        const taskDescription = description.val();
        const newTask = {
            name: taskTitle,
            type: taskDue,
            dueDate: taskDescription,
            status: 'to-do',
          };
        
          const tasks = storeTasks();
          tasks.push(newTask);
        
          storeTasks(tasks);
        
          renderTaskList();
        
          title.val('');
          dueDate.val('');
          description.val('');
        }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
const del = 
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
