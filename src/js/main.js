import DOMHandler from './DOMHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addButton');
  const taskInput = document.getElementById('taskInput');
  const taskListElement = document.getElementById('taskList');
  const clearAllButton = document.getElementById('clearAllButton');

  new DOMHandler(addButton, taskInput, taskListElement, clearAllButton);
});
