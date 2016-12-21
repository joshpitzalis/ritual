import React, { Component } from 'react';
import Streak from './Streak';
import Task from './Task';
import Add from './Add';

class App extends Component {

  constructor () {
    super();
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.state = {
      tasks: {},
      streak: 0,
      tally: ''
    };
  }

  createTask (task) {
    const tasks = {...this.state.tasks};
    const timestamp = Date.now();
    tasks[`task-${timestamp}`] = task;
    this.setState({
      tasks,
      completed: false,
      disabled: false});
  }

  updateTask (key, updatedTask) {
    const tasks = {...this.state.tasks};
    tasks[key] = updatedTask;
    this.setState({ tasks }, function updateStreak() {
      // if all tasks are complete increment streak by one, just checcking status of all tasks here
      // SuperHack! did ths by putting each completed value in an array and then squishing into a string and then checking if it includes teh word true
      const tally = Object
        .keys(this.state.tasks)
        .map(task => this.state.tasks[task].complete).toString();
      if (!tally.includes('false')){
        let streak = {...this.state.streak};
        streak = this.state.streak + 1
        this.setState({ streak });
      }
    });
  }

  render () {
    const {tasks, streak, completed, disabled} = this.state;
    return (
      <div>
        <Streak streak={streak} />
        <ol>
          {Object
            .keys(tasks)
            .map(key => <Task
              key={key}
              index={key}
              details={tasks[key]}
              updateTask={this.updateTask}
              completed={completed}
              count={tasks}
              />)
          }
        </ol>
        <Add createTask={this.createTask} />
      </div>
    );
  }
}

export default App;
