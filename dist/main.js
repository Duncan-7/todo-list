/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/project */ \"./src/modules/project.js\");\n/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projects */ \"./src/modules/projects.js\");\n/* harmony import */ var _modules_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/task */ \"./src/modules/task.js\");\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\");\n\n\n\n\n\nlet projects = Object(_modules_projects__WEBPACK_IMPORTED_MODULE_1__[\"Projects\"])();\nconst dom = Object(_modules_dom__WEBPACK_IMPORTED_MODULE_3__[\"Dom\"])();\nlet takenNames = [];\n\nconst createTask = (title, description, date, priority) => {\n  const form = document.getElementById(\"task-form\");\n  let currentProject = projects.getCurrentProject()\n  if (currentProject == undefined) {\n    alert(\"Create a project first\")\n    return\n  }\n  let task\n  if (form.title.value == \"\") {\n    task = Object(_modules_task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"])(title, description, date, priority);\n  } else if (takenNames.includes(form.title.value)) {\n    alert(\"Please choose a unique title\");\n    return\n  } else {\n    task = Object(_modules_task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"])(form.title.value, form.description.value, form.date.value, form.priority.value);\n  }\n  takenNames.push(task.getTitle());\n\n  currentProject.addTask(task);\n\n  const taskList = currentProject.getTasks()\n  const taskElement = dom.createElement(task, currentProject);\n  dom.hideForm(\"task\");\n  dom.selectTask(task, taskList);\n  addTaskListeners(taskElement, task, currentProject, taskList);\n\n  updateStorage()\n}\n\nconst addTaskListeners = (taskElement, task, currentProject, taskList) => {\n  taskElement.addEventListener('click', (e) => {\n    if (e.target.classList.value == \"button delete\") {\n      takenNames = takenNames.filter(name => name != task.getTitle());\n      dom.deleteTask(task, currentProject);\n      updateStorage();\n    } else if (e.target.classList.value == \"button edit\") {\n      dom.toggleForm(\"edit-task\");\n      dom.populateForm(task);\n    } else {\n      dom.selectTask(task, taskList);\n    }\n  })\n}\n\nconst editTask = () => {\n  const form = document.getElementById(\"edit-task-form\");\n  const currentProject = projects.getCurrentProject();\n  const taskList = currentProject.getTasks();\n  const taskToEdit = taskList.find(task => task.getTitle() == form.oldtitle.value);\n\n  dom.deleteTask(taskToEdit, currentProject);\n  createTask(form.title.value, form.description.value, form.date.value, form.priority.value);\n  dom.hideForm(\"edit-task\")\n\n}\n\nconst createProject = (title) => {\n  const form = document.getElementById(\"project-form\");\n  if (takenNames.includes(form.title.value)) {\n    alert(\"Please choose a unique title\");\n    return\n  }\n  const data = form.title.value || title\n  let project = Object(_modules_project__WEBPACK_IMPORTED_MODULE_0__[\"Project\"])(data);\n  takenNames.push(project.getTitle());\n\n  projects.addProject(project);\n  projects.setCurrentProject(project);\n\n  dom.createElement(project);\n  dom.hideForm(\"project\");\n  selectProject(project);\n\n  dom.createClickListener(dom.titleForId(project.getTitle()), selectProject, project);\n  updateStorage()\n}\n\nconst selectProject = (project) => {\n  projects.setCurrentProject(project);\n  dom.highlight(project, projects.getProjects());\n  dom.clearContents(\"task-list\");\n  dom.clearContents(\"details-container\")\n  dom.showTasks(project);\n  const taskList = project.getTasks();\n  taskList.forEach((task) => {\n    let taskId = dom.titleForId(task.getTitle());\n    let taskElement = document.getElementById(taskId);\n    addTaskListeners(taskElement, task, project, taskList);\n  })\n\n  updateStorage();\n}\n\nconst initialiseEventListeners = () => {\n  dom.createClickListener(\"new-task\", dom.toggleForm, \"task\");\n  dom.createClickListener(\"task-cancel\", dom.toggleForm, \"task\");\n  dom.createClickListener(\"task-submit\", createTask);\n\n  dom.createClickListener(\"new-project\", dom.toggleForm, \"project\");\n  dom.createClickListener(\"project-cancel\", dom.toggleForm, \"project\");\n  dom.createClickListener(\"project-submit\", createProject);\n\n  dom.createClickListener(\"edit-cancel\", dom.toggleForm, \"edit-task\")\n  dom.createClickListener(\"edit-submit\", editTask)\n\n  const deleteProjectButton = document.getElementById(\"delete-project\");\n  deleteProjectButton.addEventListener('click', (e) => {\n    e.preventDefault();\n    const currentProject = projects.getCurrentProject();\n    takenNames = takenNames.filter(name => name != currentProject.getTitle());\n    projects.deleteProject(currentProject);\n    dom.removeElement(currentProject);\n    dom.clearContents(\"task-list\");\n    selectProject(projects.getProjects()[0]);\n    updateStorage()\n  })\n}\n\n\n\nconst updateStorage = () => {\n  const projectList = projects.getProjects()\n  const cloneProjectList = [...projectList]\n  const storageArray = [];\n  for (let i = 0; i < cloneProjectList.length; i++) {\n    let taskList = cloneProjectList[i].getTasks()\n    storageArray[i] = { title: cloneProjectList[i].getTitle(), tasks: [...taskList] }\n    for (let j = 0; j < storageArray[i].tasks.length; j++) {\n      storageArray[i].tasks[j] = {\n        title: storageArray[i].tasks[j].getTitle(),\n        description: storageArray[i].tasks[j].getDescription(),\n        date: storageArray[i].tasks[j].getDueDate(),\n        priority: storageArray[i].tasks[j].getPriority()\n      }\n    }\n  }\n  const storageObject = { currentProject: projects.getCurrentProject().getTitle(), storage: storageArray }\n  localStorage.setItem(\"myProjects\", JSON.stringify(storageObject));\n}\n\nconst loadStorage = () => {\n  const myProjectsString = localStorage.getItem(\"myProjects\")\n  const storageObject = JSON.parse(myProjectsString)\n  const storageProjects = storageObject.storage\n\n  for (let i = 0; i < storageProjects.length; i++) {\n    createProject(storageProjects[i].title);\n    let taskList = storageProjects[i].tasks\n    for (let j = 0; j < taskList.length; j++) {\n      createTask(taskList[j].title, taskList[j].description, taskList[j].date, taskList[j].priority);\n    }\n  }\n  const toSetCurrentProject = projects.getProjects().find(project => project.getTitle() == storageObject.currentProject);\n  projects.setCurrentProject(toSetCurrentProject);\n  selectProject(toSetCurrentProject);\n}\n\ninitialiseEventListeners();\n\nloadStorage();\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/*! exports provided: Dom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return Dom; });\nconst Dom = () => {\n\n  //private functions\n  const taskContent = (task, element) => {\n    element.innerHTML = `${task.getTitle()} <br><br> Due Date: ${task.getDueDate()}<br><br>`\n  }\n\n  const projectContent = (project, element) => {\n    element.textContent = `${project.getTitle()}`;\n  }\n\n  const createButton = (type, element) => {\n    const button = document.createElement('button');\n    button.classList.add('button', type);\n    const buttonText = type.charAt(0).toUpperCase() + type.substring(1) + \" Task\";\n    button.textContent = buttonText;\n    element.appendChild(button);\n  }\n\n  //public functions\n  const titleForId = (title) => title.split(\" \").join(\"\");\n\n  const createElement = (object, parentObject) => {\n    const type = object.getType();\n    const title = titleForId(object.getTitle());\n    const parent = document.getElementById(`${type}-list`)\n    const element = document.createElement('div');\n\n    element.classList.add(`${type}`);\n    element.setAttribute('id', `${title}`);\n    if (type == \"task\") {\n      const taskList = parentObject.getTasks();\n\n      taskContent(object, element);\n      createButton(\"delete\", element);\n      createButton(\"edit\", element);\n      element.classList.add(object.getPriority())\n\n\n    } else if (type == \"project\") {\n      projectContent(object, element)\n    }\n\n    parent.appendChild(element);\n    return element;\n  }\n\n  const removeElement = (object) => {\n    const objectId = titleForId(object.getTitle());\n    const element = document.getElementById(objectId);\n    const parent = element.parentNode\n    parent.removeChild(element);\n  }\n\n  const highlight = (object, objectCollection) => {\n    const type = object.getType();\n    objectCollection.forEach((entry) => {\n      const id = titleForId(entry.getTitle());\n      const element = document.getElementById(id);\n      element.classList.remove(`selected-${type}`);\n      if (object.getTitle() == entry.getTitle()) {\n\n        element.classList.add(`selected-${type}`);\n      }\n    })\n  }\n\n  const clearContents = (elementId) => {\n    const element = document.getElementById(elementId);\n    while (element.firstChild) {\n      element.removeChild(element.firstChild);\n    }\n  }\n\n  const showTasks = (project) => {\n    const tasks = project.getTasks();\n    tasks.forEach(task => createElement(task, project));\n  }\n\n  const selectTask = (task, objectCollection) => {\n    highlight(task, objectCollection);\n    showTaskDetails(task);\n  }\n\n\n  const showTaskDetails = (task) => {\n    const detailsContainer = document.getElementById(\"details-container\");\n    detailsContainer.innerHTML = (`${task.getTitle()} <br><br> \n    Due Date: ${task.getDueDate()}<br><br>\n    Priority: ${task.getPriority()} <br><br> \n    Description:<br> ${task.getDescription()}<br><br>`)\n  }\n\n  const deleteTask = (task, project) => {\n    project.deleteTask(task);\n    removeElement(task);\n    clearContents(\"details-container\")\n  }\n\n  const createClickListener = (elementId, callbackFunction, argument) => {\n    const button = document.getElementById(elementId);\n    button.addEventListener('click', (e) => {\n      e.preventDefault()\n      callbackFunction(argument)\n    })\n  }\n\n  const toggleForm = (type) => {\n    const form = document.getElementById(`${type}-form`);\n    form.classList.toggle(\"hidden\");\n    form.reset();\n  }\n\n  const hideForm = (type) => {\n    const form = document.getElementById(`${type}-form`);\n    form.classList.add(\"hidden\");\n    form.reset();\n  }\n\n  const populateForm = (object) => {\n    const form = document.getElementById(\"edit-task-form\");\n    form.title.value = object.getTitle();\n    form.date.value = object.getDueDate();\n    form.description.value = object.getDescription();\n    form.priority.value = object.getPriority();\n    form.oldtitle.value = object.getTitle();\n  }\n\n  return ({\n    titleForId,\n    createElement,\n    removeElement,\n    clearContents,\n    showTasks,\n    selectTask,\n    showTaskDetails,\n    deleteTask,\n    createClickListener,\n    toggleForm,\n    hideForm,\n    populateForm,\n    highlight\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\nconst Project = (title) => {\n\n  const type = \"project\"\n  let tasks = []\n\n  // getters and setters\n  const getType = () => type;\n  const getTitle = () => title;\n  const setTitle = (newTitle) => title = newTitle\n  const getTasks = () => tasks\n  const setTasks = (newTasks) => tasks = newTasks\n\n  //public functions\n  const addTask = (task) => {\n    const taskList = getTasks();\n    taskList.push(task);\n    setTasks(taskList);\n  }\n\n  const deleteTask = (task) => {\n    const tasks = getTasks()\n    let index = tasks.findIndex((entry) => entry == task);\n    tasks.splice(index, 1);\n    setTasks(tasks);\n  }\n  return ({\n    getType,\n    getTitle,\n    setTitle,\n    getTasks,\n    setTasks,\n    addTask,\n    deleteTask\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/project.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/*! exports provided: Projects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Projects\", function() { return Projects; });\nconst Projects = () => {\n\n  const type = \"projects\"\n  let currentProject\n  let projects = []\n\n  // getters and setters\n  const getType = () => type;\n\n  const getCurrentProject = () => currentProject;\n  const setCurrentProject = (project) => currentProject = project\n\n  const getProjects = () => projects;\n  const setProjects = (newProjects) => projects = newProjects\n\n  //public functions\n  const addProject = (project) => {\n    const currentProjects = getProjects();\n    currentProjects.push(project);\n    setProjects(currentProjects);\n  }\n\n  const deleteProject = (project) => {\n    const currentProjects = getProjects()\n    let index = currentProjects.findIndex((entry) => entry == project);\n    currentProjects.splice(index, 1);\n    setProjects(currentProjects);\n  }\n  return ({\n    getType,\n    getCurrentProject,\n    setCurrentProject,\n    getProjects,\n    setProjects,\n    addProject,\n    deleteProject\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/projects.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\nconst Task = (title, description, dueDate, priority) => {\n\n  const type = \"task\"\n\n  // getters and setters\n  const getType = () => type;\n  const getTitle = () => title;\n  const setTitle = (newTitle) => title = newTitle\n  const getDescription = () => description\n  const setDescription = (newDescription) => description = newDescription\n  const getDueDate = () => dueDate;\n  const setDueDate = (newDueDate) => dueDate = newDueDate\n  const getPriority = () => priority;\n  const setPriority = (newPriority) => priority = newPriority\n\n  //public functions\n\n  return ({\n    getType,\n    getTitle,\n    setTitle,\n    getDescription,\n    setDescription,\n    getDueDate,\n    setDueDate,\n    getPriority,\n    setPriority\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/task.js?");

/***/ })

/******/ });