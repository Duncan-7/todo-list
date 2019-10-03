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
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nlet projects = [];\nlet currentProject\n\nconst projectFactory = (title) => {\n  return ({\n    title,\n    tasks: []\n  })\n}\n\nfunction createProject(title) {\n  const project = projectFactory(title);\n  projects.push(project);\n  currentProject = project;\n  displayProject(project);\n  selectProject(project);\n  populateTasks();\n}\n\nfunction displayProject(project) {\n  const container = document.getElementById('project-container');\n  const newProject = document.createElement('div');\n  newProject.setAttribute('id', project.title);\n  newProject.classList.add('project-menu-item');\n  newProject.textContent = `${project.title}`\n  container.appendChild(newProject);\n  addProjectListener(newProject, project);\n}\n\nfunction selectProject(project) {\n  currentProject = project\n  const selectedProject = document.getElementById(project.title);\n  projects.forEach(project => document.getElementById(project.title).classList.remove('selected-project'));\n  selectedProject.classList.add('selected-project');\n}\n\nfunction addProjectListener(node, project) {\n  node.addEventListener('click', () => {\n    selectProject(project);\n    populateTasks();\n\n  })\n}\n\nfunction deleteProject() {\n  projects.splice(projects.findIndex(project => project.title == currentProject.title), 1);\n  const toDelete = document.getElementById(currentProject.title)\n  toDelete.parentNode.removeChild(toDelete);\n  currentProject = projects[0];\n  selectProject(currentProject);\n  populateTasks();\n}\n\nfunction toggleProjectForm() {\n  projectForm = document.getElementById('project-form');\n  projectForm.classList.toggle('hidden');\n}\n\nconst taskFactory = (title, date, description, priority) => {\n  return ({\n    title,\n    date,\n    description,\n    priority\n  })\n}\n\nfunction toggleTaskForm() {\n  button = document.getElementById('new-task');\n  if (button.textContent == \"Add Task\") {\n    button.textContent = \"Hide Form\";\n  } else {\n    button.textContent = \"Add Task\";\n  }\n  taskForm = document.getElementById('task-form');\n  taskForm.classList.toggle('hidden');\n}\n\nfunction createTask(title, date, description, priority) {\n  const task = taskFactory(title, date, description, priority);\n  displayTask(task);\n  currentProject.tasks.push(task);\n}\n\nfunction displayTask(task) {\n  let taskList = document.getElementById('task-list');\n  let newTask = document.createElement('div');\n  newTask.classList.add('task');\n\n  newTask.innerHTML = `${task.title} <br><br> Due Date: ${task.date}<br><br>`;\n  taskList.appendChild(newTask);\n\n  const deleteButton = document.createElement('button');\n  deleteButton.textContent = \"Delete\";\n  deleteButton.classList.add('button');\n  deleteButton.addEventListener('click', (e) => {\n    deleteTask(task);\n\n  })\n  newTask.appendChild(deleteButton);\n}\n\nfunction populateTasks() {\n  const taskList = document.getElementById('task-list');\n  while (taskList.firstChild) {\n    taskList.removeChild(taskList.firstChild);\n  }\n\n  currentProject.tasks.forEach(task => displayTask(task));\n}\n\nfunction deleteTask(task) {\n  index = currentProject.tasks.findIndex(entry => entry.title == task.title)\n  currentProject.tasks.splice(index, 1);\n  populateTasks();\n}\n\nconst taskSubmit = document.getElementById('task-submit');\ntaskSubmit.addEventListener('click', (e) => {\n  e.preventDefault();\n  const taskForm = document.getElementById('task-form');\n  createTask(taskForm.title.value, taskForm.date.value, taskForm.description.value, taskForm.priority.value);\n  taskForm.reset();\n  toggleTaskForm()\n});\n\nconst taskCancel = document.getElementById('task-cancel');\ntaskCancel.addEventListener('click', (e) => {\n  e.preventDefault();\n  taskForm.reset();\n  toggleTaskForm();\n});\n\nconst projectSubmit = document.getElementById('project-submit');\nprojectSubmit.addEventListener('click', (e) => {\n  e.preventDefault();\n  const projectForm = document.getElementById('project-form');\n  createProject(projectForm.title.value);\n  projectForm.reset();\n  toggleProjectForm();\n});\n\nconst projectCancel = document.getElementById('project-cancel');\nprojectCancel.addEventListener('click', (e) => {\n  e.preventDefault();\n  projectForm.reset();\n  toggleProjectForm();\n});\n\nconst toggleTask = document.getElementById('new-task')\ntoggleTask.addEventListener('click', () => {\n  if (projects.length > 0) {\n    toggleTaskForm();\n  } else {\n    alert(\"Create a new project first!\")\n  }\n});\n\nconst newProject = document.getElementById('new-project')\nnewProject.addEventListener('click', () => {\n  toggleProjectForm();\n});\n\nconst deleteProjectButton = document.getElementById('delete-project')\ndeleteProjectButton.addEventListener('click', () => {\n  deleteProject();\n});\n\ncreateProject(\"project 1\");\ncreateTask(\"a\", \"01-01-01\", \"a\", \"a\");\ncreateTask(\"b\", \"01-01-01\", \"b\", \"b\");\ncreateProject(\"project 2\");\ncreateTask(\"c\", \"01-01-01\", \"c\", \"c\");\ncreateTask(\"d\", \"01-01-01\", \"d\", \"d\");\npopulateTasks();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });