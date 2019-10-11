const Dom = () => {

  //private functions
  const taskContent = (task, element) => {
    element.innerHTML = `${task.getTitle()} <br><br> Due Date: ${task.getDueDate()}<br><br>`
  }

  const projectContent = (project, element) => {
    element.textContent = `${project.getTitle()}`;
  }

  const createButton = (type, element) => {
    const button = document.createElement('button');
    button.classList.add('button', type);
    const buttonText = type.charAt(0).toUpperCase() + type.substring(1) + " Task";
    button.textContent = buttonText;
    element.appendChild(button);
  }

  //public functions
  const titleForId = (title) => title.split(" ").join("");

  const createElement = (object, parentObject) => {
    const type = object.getType();
    const title = titleForId(object.getTitle());
    const parent = document.getElementById(`${type}-list`)
    const element = document.createElement('div');

    element.classList.add(`${type}`);
    element.setAttribute('id', `${title}`);
    if (type == "task") {
      const taskList = parentObject.getTasks();

      taskContent(object, element);
      createButton("delete", element);
      createButton("edit", element);
      element.classList.add(object.getPriority())


    } else if (type == "project") {
      projectContent(object, element)
    }

    parent.appendChild(element);
    return element;
  }

  const removeElement = (object) => {
    const objectId = titleForId(object.getTitle());
    const element = document.getElementById(objectId);
    const parent = element.parentNode
    parent.removeChild(element);
  }

  const highlight = (object, objectCollection) => {
    const type = object.getType();
    objectCollection.forEach((entry) => {
      const id = titleForId(entry.getTitle());
      const element = document.getElementById(id);
      element.classList.remove(`selected-${type}`);
      if (object.getTitle() == entry.getTitle()) {

        element.classList.add(`selected-${type}`);
      }
    })
  }

  const clearContents = (elementId) => {
    const element = document.getElementById(elementId);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  const showTasks = (project) => {
    const tasks = project.getTasks();
    tasks.forEach(task => createElement(task, project));
  }

  const selectTask = (task, objectCollection) => {
    highlight(task, objectCollection);
    showTaskDetails(task);
  }


  const showTaskDetails = (task) => {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = (`${task.getTitle()} <br><br> 
    Due Date: ${task.getDueDate()}<br><br>
    Priority: ${task.getPriority()} <br><br> 
    Description:<br> ${task.getDescription()}<br><br>`)
  }

  const deleteTask = (task, project) => {
    project.deleteTask(task);
    removeElement(task);
    clearContents("details-container")
  }

  const createClickListener = (elementId, callbackFunction, argument) => {
    const button = document.getElementById(elementId);
    button.addEventListener('click', (e) => {
      e.preventDefault()
      callbackFunction(argument)
    })
  }

  const toggleForm = (type) => {
    const form = document.getElementById(`${type}-form`);
    form.classList.toggle("hidden");
    form.reset();
  }

  const hideForm = (type) => {
    const form = document.getElementById(`${type}-form`);
    form.classList.add("hidden");
    form.reset();
  }

  const populateForm = (object) => {
    const form = document.getElementById("edit-task-form");
    form.title.value = object.getTitle();
    form.date.value = object.getDueDate();
    form.description.value = object.getDescription();
    form.priority.value = object.getPriority();
    form.oldtitle.value = object.getTitle();
  }

  return ({
    titleForId,
    createElement,
    removeElement,
    clearContents,
    showTasks,
    selectTask,
    showTaskDetails,
    deleteTask,
    createClickListener,
    toggleForm,
    hideForm,
    populateForm,
    highlight
  })
}

export { Dom }