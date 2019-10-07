

function selectProject(project, projects) {
  const selectedProject = document.getElementById(project.title);
  projects.forEach(project => document.getElementById(project.title).classList.remove('selected-project'));
  selectedProject.classList.add('selected-project');
}

function displayProject(project, projects) {
  const container = document.getElementById('project-container');
  const newProject = document.createElement('div');
  newProject.setAttribute('id', project.title);
  newProject.classList.add('project-menu-item');
  newProject.textContent = `${project.title}`
  container.appendChild(newProject);
}


function addProjectListener(node, project, projects) {
  node.addEventListener('click', () => {
    setProject(project);
    selectProject(project, projects);
    populateTasks(project);

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

function populateTasks(project) {
  const taskList = document.getElementById('task-list');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  project.tasks.forEach(task => displayTask(task));
}

export { populateTasks }
