// All logic run after DOM is ready
document.addEventListener('DOMContentLoaded', function () {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add class using classList.add()
    li.classList.add('task-item');

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    // Add button class using classList.add()
    removeBtn.classList.add('remove-btn');

    // Remove the task when button clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Build structure
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Reset input
    taskInput.value = '';
    taskInput.focus();
  }

  // Click to add task
  addButton.addEventListener('click', addTask);

  // Press Enter to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });
});
