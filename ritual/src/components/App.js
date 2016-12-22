import React, { Component } from 'react';
import Streak from './Streak';
import Task from './Task';
import Add from './Add';
import 'console-dot-frog';

class App extends Component {

  constructor () {
    super();
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.resetTasks = this.resetTasks.bind(this);
    this.state = {
      tasks: {},
      streak: 0
    };
  }


  createTask (task) {
    const tasks = {...this.state.tasks};
    const timestamp = Date.now();
    tasks[`task-${timestamp}`] = task;
    this.setState({ tasks });
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

  resetTasks() {
    // all them tasks reset at midnight
    // console.frog();

    // 1.get all current tasks
    this.setState(
      Object.keys(this.state.tasks).map( task => {
        this.state.tasks[task].complete = false;
        this.state.tasks[task].disabled = false;
        }
      )
    )

    // 2.update complete to false on all of them
//
    // 3. schedule teh above with later,and set to local time
  }

  render () {
    const {tasks, streak, completed} = this.state;
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
        <button onClick={() => this.resetTasks()}>Clear All Tasks</button>
      </div>
    );
  }
}

export default App;
