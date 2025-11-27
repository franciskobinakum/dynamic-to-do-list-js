// All logic run after DOM is ready
document.addEventListener('DOMContentLoaded', function () {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  /**
   * addTask - create a new task item and append it to the list.
   * If called with an empty input, it alerts the user (but we avoid calling addTask automatically on page load).
   */
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // If the input is empty, prompt user to enter a task
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When clicked, remove the list item from the task list
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append remove button to the list item and append the item to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
    taskInput.focus();
  }

  // Attach event listener to the Add Task button
  addButton.addEventListener('click', addTask);

  // Allow Enter key to add a task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent form submission / default behavior
      addTask();
    }
  });

  // NOTE ABOUT "Invoke the addTask on DOMContentLoaded" from original spec:
  // It's common to set up handlers inside DOMContentLoaded (as done above).
  // We DO NOT call addTask() immediately on load, because that would attempt to add an empty task and produce an alert.
  // If you *do* want to add a default task on load, call addTask() here AFTER setting taskInput.value to a non-empty string.
});
