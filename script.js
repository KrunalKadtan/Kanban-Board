let taskData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const tasks = document.querySelectorAll('.task');

const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.bg');
const addTaskButton = document.querySelector('#add-new-task');

const columns = [todo, progress, done];
let dragElement = null;

if (localStorage.getItem('tasks')) {
  const data = JSON.parse(localStorage.getItem('tasks'));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach(task => {
      const div = document.createElement('div');

      div.classList.add('task');
      div.setAttribute("draggable", "true");

      div.innerHTML = `
          <h2>${task.title}</h2>
          <p>${task.desc}</p>
          <button>Delete</button>
      `
      column.appendChild(div);


      div.addEventListener("drag", event => {
        dragElement = div;
      })
    })

    const tasks = column.querySelectorAll('.task');
    const count = column.querySelector('.right');
    count.innerText = tasks.length;
  }
}

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
  
  const div = document.createElement('div');

  div.classList.add('task');
  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
  `
  todo.appendChild(div);


  document.querySelector('#task-title-input').value = '';
  document.querySelector('#task-description-input').value = '';

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

  div.addEventListener("drag", event => {
    dragElement = div;
  })

  modal.classList.remove('active');
})
