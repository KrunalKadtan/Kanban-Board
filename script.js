let taskData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.bg');
const addTaskButton = document.querySelector('#add-new-task');

const columns = [todo, progress, done];
let dragElement = null;

function addTask (title, desc, column) {
  const div = document.createElement('div');
  
  div.classList.add('task');
  div.setAttribute("draggable", "true");

  div.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
      <button>Delete</button>
    `
  column.appendChild(div);


  div.addEventListener("drag", event => {
    dragElement = div;
  })

  return div;
}

function updateTaskCount () {
  columns.forEach(col => {
    const tasks = col.querySelectorAll('.task');
    const count = col.querySelector('.right');

    taskData[col.id] = Array.from(tasks).map(task => {
      return {
        title: task.querySelector('h2').innerText,
        desc: task.querySelector('p').innerText
      }
    })

    localStorage.setItem("tasks", JSON.stringify(taskData));

    count.innerText = tasks.length;
  })
}

if (localStorage.getItem('tasks')) {
  const data = JSON.parse(localStorage.getItem('tasks'));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach(task => addTask(task.title, task.desc, column));
  }

  updateTaskCount();
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
  task.addEventListener("drag", event => {
    //console.log("dragging", event);
    dragElement = task;
  })
})

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", event => {
    event.preventDefault();
    column.classList.add('hover-over');
  })

  column.addEventListener("dragleave", event => {
    event.preventDefault();
    column.classList.remove('hover-over');
  })

  column.addEventListener("dragover", event => {
    event.preventDefault();
  })

  column.addEventListener("drop", event => {
    event.preventDefault();

    column.appendChild(dragElement);
    column.classList.remove('hover-over');

    updateTaskCount();
  })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

toggleModalButton.addEventListener("click", event => {
  modal.classList.toggle('active');
})

modalBg.addEventListener("click", event => {
modal.classList.remove('active');
})

addTaskButton.addEventListener("click", event => {
  
  const taskTitle = document.querySelector('#task-title-input').value;
  const taskDesc = document.querySelector('#task-description-input').value;
  
  addTask(taskTitle, taskDesc, todo);

  document.querySelector('#task-title-input').value = '';
  document.querySelector('#task-description-input').value = '';

  updateTaskCount();

  modal.classList.remove('active');
})
