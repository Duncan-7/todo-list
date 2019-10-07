const Dom = () => {

  //private functions
  const taskContent = (task, element) => {
    element.innerHTML = `${task.getTitle()} <br><br> Due Date: ${task.getDueDate()}<br><br>`
  }

  const projectContent = (project, element) => {
    element.textContent = `${project.getTitle()}`;
  }

  //public functions
  const titleForId = (title) => title.split(" ").join("");

  const createElement = (object) => {
    const type = object.getType();
    const title = titleForId(object.getTitle());
    const parent = document.getElementById(`${type}-list`)
    const element = document.createElement('div');

    element.classList.add(`${type}`);
    element.setAttribute('id', `${title}`);
    if (type == "task") {
      taskContent(object, element)
      createDeleteButton(element);
    } else if (type == "project") {
      projectContent(object, element)
    }

    parent.appendChild(element);
  }

  const removeElement = (object) => {
    const objectId = titleForId(object.getTitle());
    const element = document.getElementById(objectId);
    const parent = element.parentNode
    parent.removeChild(element);
  }

  const createDeleteButton = (element) => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = "Delete Task";
    element.appendChild(button);
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
    const taskList = document.getElementById("task-list");
    tasks.forEach(task => createElement(task));
  }


  const showTaskDetails = (task) => {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = (`${task.getTitle()} <br><br> 
    Due Date: ${task.getDueDate()}<br><br>
    Priority: ${task.getPriority()} <br><br> 
    Description:<br> ${task.getDescription()}<br><br>`)
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

  return ({
    titleForId,
    createElement,
    removeElement,
    createDeleteButton,
    clearContents,
    showTasks,
    showTaskDetails,
    createClickListener,
    toggleForm,
    highlight
  })
}

export { Dom }