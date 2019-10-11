import { Project } from './modules/project';
import { Projects } from './modules/projects';
import { Task } from './modules/task';
import { Dom } from './modules/dom';

let projects = Projects();
const dom = Dom();

const createTask = (title, description, date, priority) => {
  const form = document.getElementById("task-form");
  let task
  if (form.title.value == "") {
    task = Task(title, description, date, priority);
  } else {
    task = Task(form.title.value, form.description.value, form.date.value, form.priority.value);
  }
  let currentProject = projects.getCurrentProject()
  currentProject.addTask(task);

  const taskList = currentProject.getTasks()
  const taskElement = dom.createElement(task, currentProject);
  dom.hideForm("task");
  dom.selectTask(task, taskList);
  addTaskListeners(taskElement, task, currentProject, taskList);

  updateStorage()
}

const addTaskListeners = (taskElement, task, currentProject, taskList) => {
  taskElement.addEventListener('click', (e) => {
    if (e.target.classList.value == "button delete") {
      dom.deleteTask(task, currentProject);
      updateStorage();
    } else if (e.target.classList.value == "button edit") {
      dom.toggleForm("edit-task");
      dom.populateForm(task);
    } else {
      dom.selectTask(task, taskList);
    }
  })
}

const editTask = () => {
  const form = document.getElementById("edit-task-form");
  const currentProject = projects.getCurrentProject();
  const taskList = currentProject.getTasks();
  const taskToEdit = taskList.find(task => task.getTitle() == form.oldtitle.value);

  dom.deleteTask(taskToEdit, currentProject);
  createTask(form.title.value, form.description.value, form.date.value, form.priority.value);
  dom.hideForm("edit-task")

}

const createProject = (title) => {
  const form = document.getElementById("project-form");
  const data = form.title.value || title
  let project = Project(data);

  projects.addProject(project);
  projects.setCurrentProject(project);

  dom.createElement(project);
  dom.hideForm("project");
  selectProject(project);

  dom.createClickListener(dom.titleForId(project.getTitle()), selectProject, project);
  updateStorage()
}

const selectProject = (project) => {
  projects.setCurrentProject(project);
  dom.highlight(project, projects.getProjects());
  dom.clearContents("task-list");
  dom.clearContents("details-container")
  dom.showTasks(project);
  const taskList = project.getTasks();
  taskList.forEach((task) => {
    let taskId = dom.titleForId(task.getTitle());
    let taskElement = document.getElementById(taskId);
    addTaskListeners(taskElement, task, project, taskList);
  })

  updateStorage();
}

const initialiseEventListeners = () => {
  dom.createClickListener("new-task", dom.toggleForm, "task");
  dom.createClickListener("task-cancel", dom.toggleForm, "task");
  dom.createClickListener("task-submit", createTask);

  dom.createClickListener("new-project", dom.toggleForm, "project");
  dom.createClickListener("project-cancel", dom.toggleForm, "project");
  dom.createClickListener("project-submit", createProject);

  dom.createClickListener("edit-cancel", dom.toggleForm, "edit-task")
  dom.createClickListener("edit-submit", editTask)

  const deleteProjectButton = document.getElementById("delete-project");
  deleteProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentProject = projects.getCurrentProject();
    projects.deleteProject(currentProject);
    dom.removeElement(currentProject);
    dom.clearContents("task-list");
    updateStorage()
  })
}



const updateStorage = () => {
  const projectList = projects.getProjects()
  const cloneProjectList = [...projectList]
  const storageArray = [];
  for (let i = 0; i < cloneProjectList.length; i++) {
    let taskList = cloneProjectList[i].getTasks()
    storageArray[i] = { title: cloneProjectList[i].getTitle(), tasks: [...taskList] }
    for (let j = 0; j < storageArray[i].tasks.length; j++) {
      storageArray[i].tasks[j] = {
        title: storageArray[i].tasks[j].getTitle(),
        description: storageArray[i].tasks[j].getDescription(),
        date: storageArray[i].tasks[j].getDueDate(),
        priority: storageArray[i].tasks[j].getPriority()
      }
    }
  }
  const storageObject = { currentProject: projects.getCurrentProject().getTitle(), storage: storageArray }
  localStorage.setItem("myProjects", JSON.stringify(storageObject));
}

const loadStorage = () => {
  const myProjectsString = localStorage.getItem("myProjects")
  const storageObject = JSON.parse(myProjectsString)
  const storageProjects = storageObject.storage

  for (let i = 0; i < storageProjects.length; i++) {
    createProject(storageProjects[i].title);
    let taskList = storageProjects[i].tasks
    for (let j = 0; j < taskList.length; j++) {
      createTask(taskList[j].title, taskList[j].description, taskList[j].date, taskList[j].priority);
    }
  }
  const toSetCurrentProject = projects.getProjects().find(project => project.getTitle() == storageObject.currentProject);
  projects.setCurrentProject(toSetCurrentProject);
  selectProject(toSetCurrentProject);
}

initialiseEventListeners();

loadStorage();


