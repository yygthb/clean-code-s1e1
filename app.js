const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.querySelector('.section__new .button');
const todoTasksContainer = document.querySelector('.section__todo .tasks__list');
const completedTasksContainer = document.querySelector('.section__completed .tasks__list');

addTaskBtn.onclick = addTask;

function addTask(){
  console.log('Add Task...');

  const text = newTaskInput.value.trim();
  if (!text) return;

  const task = createNewTaskElement(text);
  todoTasksContainer.appendChild(task);
  bindTaskEvents(task, setTaskCompleted);
  newTaskInput.value = '';
}

function createNewTaskElement(text) {
  const container = document.createElement('li');
  container.classList.add('task__item');

  const checkBox = document.createElement('input');
  checkBox.classList.add('task__checkbox');
  checkBox.setAttribute('type', 'checkbox');

  const label = document.createElement('label');
  label.classList.add('task__text');
  label.innerText = text;

  const input = document.createElement('input');
  input.classList.add('input__text', 'task__input-text');

  const editBtn = document.createElement('button');
  editBtn.classList.add('button', 'button-edit');
  editBtn.innerText = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('button', 'button-delete');

  container.appendChild(checkBox);
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(editBtn);
  container.appendChild(deleteBtn);
  return container;
}

function bindTaskEvents(taskContainer, checkBoxEventHandler){
  console.log('bind list item events');
  const checkBox = taskContainer.querySelector('.task__checkbox');
  const editButton = taskContainer.querySelector('.button-edit');
  const deleteButton = taskContainer.querySelector('.button-delete');

  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

function editTask(){
  console.log('Edit Task...');

  const container = this.closest('.task__item');
  if (container) {
    const checkBox = container.querySelector('.task__checkbox');
    const label = container.querySelector('.task__text');
    const input = container.querySelector('.task__input-text');
    const editBtn = container.querySelector('.button-edit');
    const isEditable = container.classList.contains('edit');

    if (isEditable){
      if (input.value.trim()) {
        console.log('save');
        label.innerText = input.value;
        editBtn.innerText = 'Edit';
        checkBox.disabled = false;
        container.classList.toggle('edit');
      } else {
        console.log('You can\'t save empty task');
      }
    } else {
      console.log('edit');
      input.value = label.innerText;
      editBtn.innerText = 'Save';
      checkBox.disabled = true;
      container.classList.toggle('edit');
    }
  }
};

function deleteTask(){
  console.log('Delete Task...');

  const container = this.closest('.task__item');
  if (container) {
    container.remove();
  }
}

// cycle over todoTasksContainer ul list items
for (var i = 0; i < todoTasksContainer.children.length; i++){
  // bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoTasksContainer.children[i], setTaskCompleted);
}

// cycle over completedTasksContainer ul list items
for (var i = 0; i < completedTasksContainer.children.length; i++){
  // bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksContainer.children[i], setTaskInompleted);
}

function setTaskCompleted(){
  console.log('Complete Task...');
  const container = this.closest('.task__item');
  if (container) {
    const task = this.parentNode;
    completedTasksContainer.appendChild(task);
    bindTaskEvents(task, setTaskInompleted);
  }
}

function setTaskInompleted(){
  console.log('Incomplete Task...');
  const container = this.closest('.task__item');
  if (container) {
    var task = this.parentNode;
    todoTasksContainer.appendChild(task);
    bindTaskEvents(task,setTaskCompleted);
  }
}
