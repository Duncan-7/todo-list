

let projects = [];
let currentProject

const projectFactory = (title) => {
  return ({
    title,
    tasks: []
  })
}

function createProject(title) {
  const project = projectFactory(title);
  projects.push(project);
  currentProject = project;
  displayProject(project);
  selectProject(project);
  populateTasks();
}

function displayProject(project) {
  const container = document.getElementById('project-container');
  const newProject = document.createElement('div');
  newProject.setAttribute('id', project.title);
  newProject.classList.add('project-menu-item');
  newProject.textContent = `${project.title}`
  container.appendChild(newProject);
  addProjectListener(newProject, project);
}

function selectProject(project) {
  currentProject = project
  const selectedProject = document.getElementById(project.title);
  projects.forEach(project => document.getElementById(project.title).classList.remove('selected-project'));
  selectedProject.classList.add('selected-project');
}

function addProjectListener(node, project) {
  node.addEventListener('click', () => {
    selectProject(project);
    populateTasks();

  })
}

function deleteProject() {
  projects.splice(projects.findIndex(project => project.title == currentProject.title), 1);
  const toDelete = document.getElementById(currentProject.title)
  toDelete.parentNode.removeChild(toDelete);
  currentProject = projects[0];
  selectProject(currentProject);
  populateTasks();
}

function toggleProjectForm() {
  projectForm = document.getElementById('project-form');
  projectForm.classList.toggle('hidden');
}

const taskFactory = (title, date, description, priority) => {
  return ({
    title,
    date,
    description,
    priority
  })
}

function toggleTaskForm() {
  button = document.getElementById('new-task');
  if (button.textContent == "Add Task") {
    button.textContent = "Hide Form";
  } else {
    button.textContent = "Add Task";
  }
  taskForm = document.getElementById('task-form');
  taskForm.classList.toggle('hidden');
}

function createTask(title, date, description, priority) {
  const task = taskFactory(title, date, description, priority);
  displayTask(task);
  currentProject.tasks.push(task);
}

function displayTask(task) {
  let taskList = document.getElementById('task-list');
  let newTask = document.createElement('div');
  newTask.classList.add('task');

  newTask.innerHTML = `${task.title} <br><br> Due Date: ${task.date}<br><br>`;
  taskList.appendChild(newTask);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  deleteButton.classList.add('button');
  deleteButton.addEventListener('click', (e) => {
    deleteTask(task);

  })
  newTask.appendChild(deleteButton);
}

function populateTasks() {
  const taskList = document.getElementById('task-list');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  currentProject.tasks.forEach(task => displayTask(task));
}

function deleteTask(task) {
  index = currentProject.tasks.findIndex(entry => entry.title == task.title)
  currentProject.tasks.splice(index, 1);
  populateTasks();
}

const taskSubmit = document.getElementById('task-submit');
taskSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const taskForm = document.getElementById('task-form');
  createTask(taskForm.title.value, taskForm.date.value, taskForm.description.value, taskForm.priority.value);
  taskForm.reset();
  toggleTaskForm()
});

const taskCancel = document.getElementById('task-cancel');
taskCancel.addEventListener('click', (e) => {
  e.preventDefault();
  taskForm.reset();
  toggleTaskForm();
});

const projectSubmit = document.getElementById('project-submit');
projectSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const projectForm = document.getElementById('project-form');
  createProject(projectForm.title.value);
  projectForm.reset();
  toggleProjectForm();
});

const projectCancel = document.getElementById('project-cancel');
projectCancel.addEventListener('click', (e) => {
  e.preventDefault();
  projectForm.reset();
  toggleProjectForm();
});

const toggleTask = document.getElementById('new-task')
toggleTask.addEventListener('click', () => {
  if (projects.length > 0) {
    toggleTaskForm();
  } else {
    alert("Create a new project first!")
  }
});

const newProject = document.getElementById('new-project')
newProject.addEventListener('click', () => {
  toggleProjectForm();
});

const deleteProjectButton = document.getElementById('delete-project')
deleteProjectButton.addEventListener('click', () => {
  deleteProject();
});

createProject("project 1");
createTask("a", "01-01-01", "a", "a");
createTask("b", "01-01-01", "b", "b");
createProject("project 2");
createTask("c", "01-01-01", "c", "c");
createTask("d", "01-01-01", "d", "d");
populateTasks();