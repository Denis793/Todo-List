import Task from './Task.js';

export default class TaskManager {
  constructor(taskListElement) {
    this.taskListElement = taskListElement;
    this.storageKey = 'tasks';
    this.saveToStorage = this.saveToStorage.bind(this);
    this.loadFromStorage();
  }

  addTask(taskText, isCompleted = false) {
    new Task(taskText, this.taskListElement, isCompleted, this.saveToStorage);
    this.saveToStorage();
  }

  clearAllTasks() {
    this.taskListElement.innerHTML = '';
    localStorage.removeItem(this.storageKey);
  }

  saveToStorage() {
    const tasks = [];
    this.taskListElement.querySelectorAll('.task-item').forEach((item) => {
      const text = item.querySelector('.task-text')?.textContent || item.querySelector('.edit-input')?.value || '';
      const isCompleted = item.classList.contains('completed');
      tasks.push({ text, isCompleted });
    });
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  loadFromStorage() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    data.forEach((t) => this.addTask(t.text, t.isCompleted));
  }
}
