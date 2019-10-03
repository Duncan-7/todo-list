let projects = [];
let currentProject

function createProject(title) {
  const project = projectFactory(title);
  projects.push(project);
  currentProject = project;
  displayProject(project);
}

function displayProject(project) {
  const container = document.getElementById('project-container');
  const newProject = document.createElement('div');
  newProject.classList.add('project-menu-item');
  newProject.textContent = `${project.title}`
  container.appendChild(newProject);
  addProjectListener(newProject, project);
}

function addProjectListener(node, project) {
  node.addEventListener('click', () => {
    currentProject = project;
    populateTasks();
  })
}

const projectFactory = (title) => {
  return ({
    title,
    tasks: []
  })
}

function toggleProjectForm() {
  projectForm = document.getElementById('project-form');
  projectForm.classList.toggle('hidden');
}

const taskFactory = (title, description, priority) => {
  return ({
    title,
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

function createTask(title, description, priority) {
  task = taskFactory(title, description, priority);
  displayTask(task);
  currentProject.tasks.push(task);
}

function displayTask(task) {
  taskList = document.getElementById('task-list');
  newTask = document.createElement('div');
  newTask.classList.add('task');

  newTask.textContent = `Title: ${task.title}, priority: ${task.priority}, description: ${task.description}`;
  taskList.appendChild(newTask);
}

function populateTasks() {
  taskList = document.getElementById('task-list');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  currentProject.tasks.forEach(task => displayTask(task));
}

const taskSubmit = document.getElementById('task-submit');
taskSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const taskForm = document.getElementById('task-form');
  createTask(taskForm.title.value, taskForm.description.value, taskForm.priority.value);
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
  toggleProjectForm()
});

const projectCancel = document.getElementById('project-cancel');
projectCancel.addEventListener('click', (e) => {
  e.preventDefault();
  projectForm.reset();
  toggleProjectForm()
});

const toggleTask = document.getElementById('new-task')
toggleTask.addEventListener('click', () => {
  toggleTaskForm();
});

const newProject = document.getElementById('new-project')
newProject.addEventListener('click', () => {
  toggleProjectForm();
});

createProject("project 1");
createTask("a", "a", "a");
createTask("b", "b", "b");
createProject("project 2");
createTask("c", "c", "c");
createTask("d", "d", "d");
populateTasks();