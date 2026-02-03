const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const tasks = document.querySelectorAll('.task');

let dragElement = null;

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
  })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
