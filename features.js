// //Initial References
// const newTaskInput = document.querySelector("#new-task input");
// const tasksDiv = document.querySelector("#tasks");
// let deleteTasks, editTasks, tasks;
// let updateNote = "";
// let count;

// //Function on window load
// window.onload = () => {
//   updateNote = "";
//   count = Object.keys(localStorage).length;
//   displayTasks();
// };

// //Function to Display The Tasks
// const displayTasks = () => {
//   if (Object.keys(localStorage).length > 0) {
//     tasksDiv.style.display = "inline-block";
//   } else {
//     tasksDiv.style.display = "none";
//   }

//   //Clear the tasks
//   tasksDiv.innerHTML = "";

//   //Fetch All The Keys in local storage
//   let tasks = Object.keys(localStorage);
//   tasks = tasks.sort();

//   for (let key of tasks) {
//     let classValue = "";

//     //Get all values
//     let value = localStorage.getItem(key);
//     let taskInnerDiv = document.createElement("div");
//     taskInnerDiv.classList.add("task");
//     taskInnerDiv.setAttribute("id", key);
//     taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
//     //localstorage would store boolean as string so we parse it to boolean back
//     let editButton = document.createElement("button");
//     editButton.classList.add("edit");
//     editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
//     if (!JSON.parse(value)) {
//       editButton.style.visibility = "visible";
//     } else {
//       editButton.style.visibility = "hidden";
//       taskInnerDiv.classList.add("completed");
//     }
//     taskInnerDiv.appendChild(editButton);
//     taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
//     tasksDiv.appendChild(taskInnerDiv);
//   }

//   //tasks completed
//   tasks = document.querySelectorAll(".task");
//   tasks.forEach((element, index) => {
//     element.onclick = () => {
//       //local storage update
//       if (element.classList.contains("completed")) {
//         updateStorage(element.id.split("_")[0], element.innerText, false);
//       } else {
//         updateStorage(element.id.split("_")[0], element.innerText, true);
//       }
//     };
//   });

//   //Edit Tasks
//   editTasks = document.getElementsByClassName("edit");
//   Array.from(editTasks).forEach((element, index) => {
//     element.addEventListener("click", (e) => {
//       //Stop propogation to outer elements (if removed when we click delete eventually rhw click will move to parent)
//       e.stopPropagation();
//       //disable other edit buttons when one task is being edited
//       disableButtons(true);
//       //update input value and remove div
//       let parent = element.parentElement;
//       newTaskInput.value = parent.querySelector("#taskname").innerText;
//       //set updateNote to the task that is being edited
//       updateNote = parent.id;
//       //remove task
//       parent.remove();
//     });
//   });

//   //Delete Tasks
//   deleteTasks = document.getElementsByClassName("delete");
//   Array.from(deleteTasks).forEach((element, index) => {
//     element.addEventListener("click", (e) => {
//       e.stopPropagation();
//       //Delete from local storage and remove div
//       let parent = element.parentElement;
//       removeTask(parent.id);
//       parent.remove();
//       count -= 1;
//     });
//   });
// };

// //Disable Edit Button
// const disableButtons = (bool) => {
//   let editButtons = document.getElementsByClassName("edit");
//   Array.from(editButtons).forEach((element) => {
//     element.disabled = bool;
//   });
// };

// //Remove Task from local storage
// const removeTask = (taskValue) => {
//   localStorage.removeItem(taskValue);
//   displayTasks();
// };

// //Add tasks to local storage
// const updateStorage = (index, taskValue, completed) => {
//   localStorage.setItem(`${index}_${taskValue}`, completed);
//   displayTasks();
// };

// //Function To Add New Task
// document.querySelector("#push").addEventListener("click", () => {
//   //Enable the edit button
//   disableButtons(false);
//   if (newTaskInput.value.length == 0) {
//     alert("Please Enter A Task");
//   } else {
//     //Store locally and display from local storage
//     if (updateNote == "") {
//       //new task
//       updateStorage(count, newTaskInput.value, false);
//     } else {
//       //update task
//       let existingCount = updateNote.split("_")[0];
//       removeTask(updateNote);
//       updateStorage(existingCount, newTaskInput.value, false);
//       updateNote = "";
//     }
//     count += 1;
//     newTaskInput.value = "";
//   }
// });


// Initialize interact.js for drag-and-drop
document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const todoList = document.getElementById('todo-list');

  addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.textContent = taskText;

    todoList.appendChild(taskItem);
    taskInput.value = '';
  });

  // Initialize interact.js for drag-and-drop
  interact('.todo-list .task-item')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '.todo-container',
          endOnly: true
        })
      ],
      autoScroll: true,
      onstart: function (event) {
        event.target.classList.add('dragging');
      }
    });

  interact('.matrix-category')
    .dropzone({
      accept: '.task-item',
      overlap: 0.75,

      ondragenter: function (event) {
        event.target.classList.add('drag-over');
      },
      ondragleave: function (event) {
        event.target.classList.remove('drag-over');
      },
      ondrop: function (event) {
        let taskElement = event.relatedTarget;
        let category = event.target.getAttribute('data-category');
        taskElement.classList.remove('dragging');
        taskElement.classList.add('dropped');
        event.target.appendChild(taskElement);

        // Optionally, you can handle the task data (e.g., save to database) here
        console.log(`Task "${taskElement.textContent.trim()}" dropped into category "${category}"`);
      }
    });
});

const slider = document.getElementById('slider');
const divider = document.getElementById('divider');

slider.oninput = function() {
  const value = this.value;
  const panel1Width = value + '%';
  const panel2Width = 100 - value + '%';

  document.getElementById('panel1').style.width = panel1Width;
  document.getElementById('panel2').style.width = panel2Width;
  divider.style.left = panel1Width;
};
