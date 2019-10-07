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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-page */ \"./src/test-page.js\");\n/* harmony import */ var _modules_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/project */ \"./src/modules/project.js\");\n/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/projects */ \"./src/modules/projects.js\");\n/* harmony import */ var _modules_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/task */ \"./src/modules/task.js\");\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\");\n\n\n\n\n\n\nconst projects = Object(_modules_projects__WEBPACK_IMPORTED_MODULE_2__[\"Projects\"])();\nconst dom = Object(_modules_dom__WEBPACK_IMPORTED_MODULE_4__[\"Dom\"])();\n\nconst createTask = (title) => {\n  const form = document.getElementById(\"task-form\");\n  if (form.title.value == \"\") {\n    // alert(\"You must enter a title\");\n  }\n\n  // let task = Task(form.title.value, form.description.value, form.date.value, form.priority.value);\n  let task = Object(_modules_task__WEBPACK_IMPORTED_MODULE_3__[\"Task\"])(title, \"test details\", \"01/01/01\", \"high\");\n\n  let currentProject = projects.getCurrentProject()\n  currentProject.addTask(task);\n\n  dom.createElement(task);\n  dom.toggleForm(\"task\");\n\n  selectTask(task);\n\n  const taskId = dom.titleForId(task.getTitle());\n  const element = document.getElementById(taskId);\n  console.log(element);\n  // element.addEventListener('click', (e) => {\n  //   selectTask(task);\n  dom.createClickListener(taskId, selectTask, task);\n\n\n  const deleteButton = element.querySelector('button');\n  deleteButton.addEventListener('click', (e) => {\n    let currentProject = projects.getCurrentProject();\n    currentProject.deleteTask(task);\n    dom.removeElement(task);\n  })\n}\n\nconst selectTask = (task) => {\n  let currentProject = projects.getCurrentProject();\n  dom.highlight(task, currentProject.getTasks());\n  dom.showTaskDetails(task);\n  console.log(\"test\")\n}\n\nconst createProject = (title) => {\n  const form = document.getElementById(\"project-form\");\n  const data = title || form.title.value\n  let project = Object(_modules_project__WEBPACK_IMPORTED_MODULE_1__[\"Project\"])(data);\n\n  projects.addProject(project);\n  projects.setCurrentProject(project);\n\n  dom.createElement(project);\n  dom.toggleForm(\"project\");\n  selectProject(project);\n\n  dom.createClickListener(dom.titleForId(project.getTitle()), selectProject, project);\n}\n\nconst selectProject = (project) => {\n  projects.setCurrentProject(project);\n  dom.highlight(project, projects.getProjects());\n  dom.clearContents(\"task-list\");\n  dom.showTasks(project);\n}\n\nconst initialiseEventListeners = () => {\n  dom.createClickListener(\"new-task\", dom.toggleForm, \"task\")\n  dom.createClickListener(\"task-cancel\", dom.toggleForm, \"task\")\n  dom.createClickListener(\"task-submit\", createTask)\n\n  dom.createClickListener(\"new-project\", dom.toggleForm, \"project\")\n  dom.createClickListener(\"project-cancel\", dom.toggleForm, \"project\")\n  dom.createClickListener(\"project-submit\", createProject)\n\n  const deleteProjectButton = document.getElementById(\"delete-project\");\n  deleteProjectButton.addEventListener('click', (e) => {\n    e.preventDefault();\n    const currentProject = projects.getCurrentProject();\n    projects.deleteProject(currentProject);\n    dom.removeElement(currentProject);\n  })\n}\n\ninitialiseEventListeners()\ncreateProject(\"test\");\ncreateTask(\"test task 1\")\ncreateTask(\"test task 2\")\ncreateProject(\"test2\");\ncreateTask(\"test task 3\")\ncreateTask(\"test task 4\")\nconsole.log()\n\nfunction test(number) {\n  console.log(number);\n}\n\nfunction sum(x, y) {\n  return x + y\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/*! exports provided: Dom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dom\", function() { return Dom; });\nconst Dom = () => {\n\n  //private functions\n  const taskContent = (task, element) => {\n    element.innerHTML = `${task.getTitle()} <br><br> Due Date: ${task.getDueDate()}<br><br>`\n  }\n\n  const projectContent = (project, element) => {\n    element.textContent = `${project.getTitle()}`;\n  }\n\n  //public functions\n  const titleForId = (title) => title.split(\" \").join(\"\");\n\n  const createElement = (object) => {\n    const type = object.getType();\n    const title = titleForId(object.getTitle());\n    const parent = document.getElementById(`${type}-list`)\n    const element = document.createElement('div');\n\n    element.classList.add(`${type}`);\n    element.setAttribute('id', `${title}`);\n    if (type == \"task\") {\n      taskContent(object, element)\n      createDeleteButton(element);\n    } else if (type == \"project\") {\n      projectContent(object, element)\n    }\n\n    parent.appendChild(element);\n  }\n\n  const removeElement = (object) => {\n    const objectId = titleForId(object.getTitle());\n    const element = document.getElementById(objectId);\n    const parent = element.parentNode\n    parent.removeChild(element);\n  }\n\n  const createDeleteButton = (element) => {\n    const button = document.createElement('button');\n    button.classList.add('button');\n    button.textContent = \"Delete Task\";\n    element.appendChild(button);\n  }\n\n  const highlight = (object, objectCollection) => {\n    const type = object.getType();\n    objectCollection.forEach((entry) => {\n      const id = titleForId(entry.getTitle());\n      const element = document.getElementById(id);\n      element.classList.remove(`selected-${type}`);\n      if (object.getTitle() == entry.getTitle()) {\n\n        element.classList.add(`selected-${type}`);\n      }\n    })\n  }\n\n  const clearContents = (elementId) => {\n    const element = document.getElementById(elementId);\n    while (element.firstChild) {\n      element.removeChild(element.firstChild);\n    }\n  }\n\n  const showTasks = (project) => {\n    const tasks = project.getTasks();\n    const taskList = document.getElementById(\"task-list\");\n    tasks.forEach(task => createElement(task));\n  }\n\n\n  const showTaskDetails = (task) => {\n    const detailsContainer = document.getElementById(\"details-container\");\n    detailsContainer.innerHTML = (`${task.getTitle()} <br><br> \n    Due Date: ${task.getDueDate()}<br><br>\n    Priority: ${task.getPriority()} <br><br> \n    Description:<br> ${task.getDescription()}<br><br>`)\n  }\n\n  const createClickListener = (elementId, callbackFunction, argument) => {\n    const button = document.getElementById(elementId);\n    button.addEventListener('click', (e) => {\n      e.preventDefault()\n      callbackFunction(argument)\n    })\n  }\n\n  const toggleForm = (type) => {\n    const form = document.getElementById(`${type}-form`);\n    form.classList.toggle(\"hidden\");\n    form.reset();\n  }\n\n  return ({\n    titleForId,\n    createElement,\n    removeElement,\n    createDeleteButton,\n    clearContents,\n    showTasks,\n    showTaskDetails,\n    createClickListener,\n    toggleForm,\n    highlight\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\nconst Project = (title) => {\n\n  const type = \"project\"\n  let tasks = []\n\n  // getters and setters\n  const getType = () => type;\n  const getTitle = () => title;\n  const setTitle = (newTitle) => title = newTitle\n  const getTasks = () => tasks\n  const setTasks = (newTasks) => tasks = newTasks\n\n  //public functions\n  const addTask = (task) => {\n    const tasks = getTasks();\n    tasks.push(task);\n    setTasks(tasks);\n  }\n\n  const deleteTask = (task) => {\n    const tasks = getTasks()\n    let index = tasks.findIndex((entry) => entry == task);\n    tasks.splice(index, 1);\n    setTasks(tasks);\n  }\n  return ({\n    getType,\n    getTitle,\n    setTitle,\n    getTasks,\n    setTasks,\n    addTask,\n    deleteTask\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/project.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/*! exports provided: Projects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Projects\", function() { return Projects; });\nconst Projects = () => {\n\n  let currentProject\n  let projects = []\n\n  // getters and setters\n  const getCurrentProject = () => currentProject;\n  const setCurrentProject = (project) => currentProject = project\n\n  const getProjects = () => projects;\n  const setProjects = (newProjects) => projects = newProjects\n\n  //public functions\n  const addProject = (project) => {\n    const currentProjects = getProjects();\n    currentProjects.push(project);\n    setProjects(currentProjects);\n  }\n\n  const deleteProject = (project) => {\n    const currentProjects = getProjects()\n    let index = currentProjects.findIndex((entry) => entry == project);\n    currentProjects.splice(index, 1);\n    setProjects(currentProjects);\n  }\n  return ({\n    getCurrentProject,\n    setCurrentProject,\n    getProjects,\n    setProjects,\n    addProject,\n    deleteProject\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/projects.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\nconst Task = (title, description, dueDate, priority) => {\n\n  const type = \"task\"\n\n  // getters and setters\n  const getType = () => type;\n  const getTitle = () => title;\n  const setTitle = (newTitle) => title = newTitle\n  const getDescription = () => description\n  const setDescription = (newDescription) => description = newDescription\n  const getDueDate = () => dueDate;\n  const setDueDate = (newDueDate) => dueDate = newDueDate\n  const getPriority = () => priority;\n  const setPriority = (newPriority) => priority = newPriority\n\n  return ({\n    getType,\n    getTitle,\n    setTitle,\n    getDescription,\n    setDescription,\n    getDueDate,\n    setDueDate,\n    getPriority,\n    setPriority\n  })\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/task.js?");

/***/ }),

/***/ "./src/test-page.js":
/*!**************************!*\
  !*** ./src/test-page.js ***!
  \**************************/
/*! exports provided: testFunctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"testFunctions\", function() { return testFunctions; });\nconst testFunctions = (title) => {\n\n  const getTitle = () => title\n  const setTitle = (newTitle) => title = newTitle\n  const test1 = () => console.log(\"test-page test 1\");\n  const test2 = () => console.log(\"test-page test 2\");\n  return ({\n    test1,\n    test2,\n    getTitle,\n    setTitle\n  })\n}\n\n\n\n\n//# sourceURL=webpack:///./src/test-page.js?");

/***/ })

/******/ });