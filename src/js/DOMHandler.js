import TaskManager from './TaskManager.js';

export default class DOMHandler {
  constructor(addButton, taskInput, taskListElement, clearAllButton) {
    this.taskManager = new TaskManager(taskListElement);
    this.addButton = addButton;
    this.taskInput = taskInput;
    this.clearAllButton = clearAllButton;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.addButton.addEventListener('click', () => this.handleAddTask());
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleAddTask();
    });
    this.taskInput.addEventListener('input', () => this.clearError());
    this.clearAllButton.addEventListener('click', () => this.taskManager.clearAllTasks());
  }

  handleAddTask() {
    const taskText = this.taskInput.value.trim();

    this.clearError();

    if (!taskText) {
      this.showError('Task name cannot be empty!');
      return;
    }

    this.taskManager.addTask(taskText);
    this.taskInput.value = '';
  }

  showError(message) {
    this.taskInput.classList.add('error');

    if (!this.taskInput.parentElement.querySelector('.error-message')) {
      const errorMsg = document.createElement('span');
      errorMsg.className = 'error-message';
      errorMsg.textContent = message;
      this.taskInput.parentElement.appendChild(errorMsg);
    }
  }

  clearError() {
    this.taskInput.classList.remove('error');
    const oldError = this.taskInput.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
  }
}
