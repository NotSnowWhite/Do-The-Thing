// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const title = $('#taskTitle');
const dueDate = $('#dueDate');
const description = $('#description');
const taskDisplay = $('#task-display');
const formSub = $('#addProject')
// modal script for buttons and modal
const modal = $('.modal');
const exitButton = $('.close');
const modalButton = $('.btn');


// makes exit button remove modal
exitButton.click(function () {
    modal.hide();
});

// function to call form on submit 
const form = $('#taskForm');
form.on('submit', function (event) {
    event.preventDefault();
    const taskTitle = title.val();
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

function readTasks() {
    taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    return taskList;
  }
  
  function storeTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasks();
  const todoList = $('#todo-cards');
  const inProgressList = $('#in-progress-cards');
    const doneList = $('#done-cards');

    todoList.empty();

  
    inProgressList.empty();
  
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
          todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
          inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
          doneList.append(createTaskCard(task));
        }
      }

        $( ".draggable" ).draggable({
        zIndex: 100,
        });
      }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
        event.preventDefault();
        const taskTitle = title.val().trim();
        const taskDue = dueDate.val();
        const taskDescription = description.val();
        const newTask = {
            id: generateTaskId(),
            name: taskTitle,
            type: taskDue,
            dueDate: taskDescription,
            status: 'to-do',
          };
        
          const tasks = readTasks();
          tasks.push(newTask);
        
          storeTasks(tasks);
        
          renderTaskList();
        
          title.val('');
          dueDate.val('');
          description.val('');
        }


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
const tasks = readTasks(); 
    const taskId = $(this).attr('data-task-id');
  
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
          tasks.splice(i, 1);
          break;
      }
    };
  
    storeTasks(tasks);
    renderTaskList();
  }

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let tasks = readTasks();
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  tasks = tasks.map(task => {
      if (task.id === taskId) {
          task.status = newStatus;
      }
      return task;
  });

  storeTasks(tasks);
  renderTaskList();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
        renderTaskList();
      
        $('#dueDate').datepicker({
          changeMonth: true,
          changeYear: true,
        });
      
        $('.lane').droppable({
          accept: '.draggable',
          drop: handleDrop,
        });
});

taskDisplay.on('click', '.btn-delete-task', handleDeleteTask);
formSub.on('click', handleAddTask);
