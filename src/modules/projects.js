const Projects = () => {

  const type = "projects"
  let currentProject
  let projects = []

  // getters and setters
  const getType = () => type;

  const getCurrentProject = () => currentProject;
  const setCurrentProject = (project) => currentProject = project

  const getProjects = () => projects;
  const setProjects = (newProjects) => projects = newProjects

  //public functions
  const addProject = (project) => {
    const currentProjects = getProjects();
    currentProjects.push(project);
    setProjects(currentProjects);
  }

  const deleteProject = (project) => {
    const currentProjects = getProjects()
    let index = currentProjects.findIndex((entry) => entry == project);
    currentProjects.splice(index, 1);
    setProjects(currentProjects);
  }
  return ({
    getType,
    getCurrentProject,
    setCurrentProject,
    getProjects,
    setProjects,
    addProject,
    deleteProject
  })
}

export { Projects }