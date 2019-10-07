import { testFunctions } from './test-page';
import { Project } from './modules/project';
import { Projects } from './modules/projects';
import { Task } from './modules/task';
import { Dom } from './modules/dom';

const projects = Projects();
const dom = Dom();

const createTask = (title) => {
  const form = document.getElementById("task-form");
  if (form.title.value == "") {
    // alert("You must enter a title");
  }

  // let task = Task(form.title.value, form.description.value, form.date.value, form.priority.value);
  let task = Task(title, "test details", "01/01/01", "high");

  let currentProject = projects.getCurrentProject()
  currentProject.addTask(task);

  dom.createElement(task);
  dom.toggleForm("task");

  selectTask(task);

  const taskId = dom.titleForId(task.getTitle());
  const element = document.getElementById(taskId);
  console.log(element);
  // element.addEventListener('click', (e) => {
  //   selectTask(task);
  dom.createClickListener(taskId, selectTask, task);


  const deleteButton = element.querySelector('button');
  deleteButton.addEventListener('click', (e) => {
    let currentProject = projects.getCurrentProject();
    currentProject.deleteTask(task);
    dom.removeElement(task);
  })
}

const selectTask = (task) => {
  let currentProject = projects.getCurrentProject();
  dom.highlight(task, currentProject.getTasks());
  dom.showTaskDetails(task);
  console.log("test")
}

const createProject = (title) => {
  const form = document.getElementById("project-form");
  const data = title || form.title.value
  let project = Project(data);

  projects.addProject(project);
  projects.setCurrentProject(project);

  dom.createElement(project);
  dom.toggleForm("project");
  selectProject(project);

  dom.createClickListener(dom.titleForId(project.getTitle()), selectProject, project);
}

const selectProject = (project) => {
  projects.setCurrentProject(project);
  dom.highlight(project, projects.getProjects());
  dom.clearContents("task-list");
  dom.showTasks(project);
}

const initialiseEventListeners = () => {
  dom.createClickListener("new-task", dom.toggleForm, "task")
  dom.createClickListener("task-cancel", dom.toggleForm, "task")
  dom.createClickListener("task-submit", createTask)

  dom.createClickListener("new-project", dom.toggleForm, "project")
  dom.createClickListener("project-cancel", dom.toggleForm, "project")
  dom.createClickListener("project-submit", createProject)

  const deleteProjectButton = document.getElementById("delete-project");
  deleteProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentProject = projects.getCurrentProject();
    projects.deleteProject(currentProject);
    dom.removeElement(currentProject);
  })
}

initialiseEventListeners()
createProject("test");
createTask("test task 1")
createTask("test task 2")
createProject("test2");
createTask("test task 3")
createTask("test task 4")
console.log()

function test(number) {
  console.log(number);
}

function sum(x, y) {
  return x + y
}


