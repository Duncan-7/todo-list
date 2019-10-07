const testFunctions = (title) => {

  const getTitle = () => title
  const setTitle = (newTitle) => title = newTitle
  const test1 = () => console.log("test-page test 1");
  const test2 = () => console.log("test-page test 2");
  return ({
    test1,
    test2,
    getTitle,
    setTitle
  })
}

export { testFunctions }
