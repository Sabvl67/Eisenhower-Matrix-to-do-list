document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const categorySelect = document.getElementById('category-select');
  const matrixCategories = document.querySelectorAll('.matrix-category');

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Do nothing if input is empty

    const selectedCategoryValue = categorySelect.value;

    const taskItem = createTaskElement(taskText);

    // Append task item to the corresponding matrix category
    matrixCategories.forEach(category => {
      const categoryValue = category.getAttribute('data-category');
      if (categoryValue === selectedCategoryValue) {
        const categoryTaskList = category.querySelector('.category-task');
        categoryTaskList.appendChild(taskItem);
      }
    });

    // Clear input after adding task
    taskInput.value = '';
  });

  addTaskBtn.addEventListener('click', function () {
    taskForm.dispatchEvent(new Event('submit')); // Trigger form submission on button click
  });

  function createTaskElement(taskText) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-actions">
        <button class="action-btn edit-btn">Edit</button>
        <button class="action-btn delete-btn">Delete</button>
      </div>
    `;

    const taskTextElement = taskItem.querySelector('.task-text');
    taskTextElement.addEventListener('click', function() {
      taskTextElement.classList.toggle('completed');
    });

    const editBtn = taskItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
      const newText = prompt('Edit task:', taskText);
      if (newText !== null) {
        taskTextElement.textContent = newText;
      }
    });

    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
      taskItem.remove();
    });

    return taskItem;
  }
});
