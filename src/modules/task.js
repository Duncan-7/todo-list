const Task = (title, description, dueDate, priority) => {

  const type = "task"

  // getters and setters
  const getType = () => type;
  const getTitle = () => title;
  const setTitle = (newTitle) => title = newTitle
  const getDescription = () => description
  const setDescription = (newDescription) => description = newDescription
  const getDueDate = () => dueDate;
  const setDueDate = (newDueDate) => dueDate = newDueDate
  const getPriority = () => priority;
  const setPriority = (newPriority) => priority = newPriority

  //public functions

  return ({
    getType,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority
  })
}

export { Task }