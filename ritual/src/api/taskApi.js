module.exports = {
  setTasks(tasks) {
    if (Array.isArray(tasks)) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return tasks;
    }
  }
};
