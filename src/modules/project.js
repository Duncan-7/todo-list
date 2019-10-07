const Project = (title) => {

  const type = "project"
  let tasks = []

  // getters and setters
  const getType = () => type;
  const getTitle = () => title;
  const setTitle = (newTitle) => title = newTitle
  const getTasks = () => tasks
  const setTasks = (newTasks) => tasks = newTasks

  //public functions
  const addTask = (task) => {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
  }

  const deleteTask = (task) => {
    const tasks = getTasks()
    let index = tasks.findIndex((entry) => entry == task);
    tasks.splice(index, 1);
    setTasks(tasks);
  }
  return ({
    getType,
    getTitle,
    setTitle,
    getTasks,
    setTasks,
    addTask,
    deleteTask
  })
}

export { Project }