export default class Task {
  constructor(text, taskList, isCompleted = false, onChange = () => {}) {
    this.text = text;
    this.isCompleted = isCompleted;
    this.taskList = taskList;
    this.onChange = onChange;
    this.render();
  }

  render() {
    const html = `
      <li class="task-item${this.isCompleted ? ' completed' : ''}">
        <div class="left-content">
          <input type="checkbox" class="checkbox" ${this.isCompleted ? 'checked' : ''}>
          <span class="task-text">${this.text}</span>
        </div>
        <div class="right-content">
          <button class="edit-button visible"><img src="./src/img/edit-icon.png" alt="Edit" class="icon"></button>
          <button class="save-button hidden"><img src="./src/img/complete-icon.png" alt="Save" class="icon"></button>
          <button class="delete-button"><img src="./src/img/delete-icon.png" alt="Delete" class="icon"></button>
        </div>
      </li>
    `;
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    this.taskElement = tpl.content.firstChild;
    this.taskList.appendChild(this.taskElement);
    this.addEventListeners();
  }

  addEventListeners() {
    this.checkbox = this.taskElement.querySelector('.checkbox');
    this.taskSpan = this.taskElement.querySelector('.task-text');
    this.editButton = this.taskElement.querySelector('.edit-button');
    this.saveButton = this.taskElement.querySelector('.save-button');
    this.deleteButton = this.taskElement.querySelector('.delete-button');

    this.checkbox.addEventListener('change', () => {
      this.toggleCompletion();
      this.onChange();
    });
    this.editButton.addEventListener('click', () => this.editTask());
    this.saveButton.addEventListener('click', () => {
      this.saveTask();
      this.onChange();
    });
    this.deleteButton.addEventListener('click', () => {
      this.deleteTask();
      this.onChange();
    });
  }

  toggleCompletion() {
    this.isCompleted = this.checkbox.checked;
    this.taskElement.classList.toggle('completed', this.isCompleted);
    this.taskSpan.classList.toggle('completed-text', this.isCompleted);
    this.taskElement.setAttribute('aria-checked', this.isCompleted);
    this.updateEditButtonVisibility();
  }

  updateEditButtonVisibility() {
    this.editButton.classList.toggle('hidden', this.isCompleted);
    this.editButton.classList.toggle('visible', !this.isCompleted);
  }

  editTask() {
    if (this.isCompleted) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.text;
    input.className = 'edit-input';
    this.taskSpan.replaceWith(input);
    input.focus();
    this.editButton.classList.add('hidden');
    this.saveButton.classList.remove('hidden');
  }

  saveTask() {
    const input = this.taskElement.querySelector('.edit-input');
    const newText = input.value.trim();
    if (!newText) return;
    this.text = newText;
    this.taskSpan.textContent = newText;
    input.replaceWith(this.taskSpan);
    this.editButton.classList.remove('hidden');
    this.saveButton.classList.add('hidden');
  }

  deleteTask() {
    this.taskList.removeChild(this.taskElement);
  }
}
