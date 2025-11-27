// script.js
// Persist tasks to localStorage, create and remove DOM elements, and wire up UI events.

document.addEventListener('DOMContentLoaded', function () {
  // DOM references
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Tasks array (source of truth)
  let tasks = [];

  /**
   * createTaskElement - create a <li> element with task text and remove button,
   * append it to the DOM and wire the remove handler which updates localStorage.
   * @param {string} taskText
   */
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.classList.add('task-item');

    // Add the text node first (so button is separate)
    li.appendChild(document.createTextNode(taskText));

    // Create remove button and style it via classList
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove handler: remove from DOM and from tasks array, then update localStorage
    removeBtn.onclick = function () {
      // Remove from DOM
      if (taskList.contains(li)) taskList.removeChild(li);

      // Remove one occurrence of taskText from tasks array
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    };

    // Append button and list item
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  /**
   * addTask - read input, validate, save to tasks array + localStorage, and create DOM element.
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Update in-memory array and persist
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Create DOM element
    createTaskElement(taskText);

    // Reset input
    taskInput.value = '';
    taskInput.focus();
  }

  /**
   * loadTasks - read tasks from localStorage and populate the DOM.
   */
  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    // ensure tasks is an array copy of stored tasks
    tasks = Array.isArray(stored) ? stored.slice() : [];

    // Create DOM elements for each stored task
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  }

  // Wire UI events
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

  // Initial load from localStorage
  loadTasks();
});
