import React, { Component } from 'react';
import Streak from './Streak';
import Task from './Task';
import Add from './Add';
import 'console-dot-frog';
import later from 'later';
import base from '../base';

class App extends Component {

  constructor () {
    super();
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.updateStreak = this.updateStreak.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.state = {
      tasks: {},
      streak: 0,
      updatedToday: false
    };
  }

  componentWillMount () {
    this.ref = base.syncState('tasks',{
      context: this,
      state: 'tasks'
    });
  }

  componentDidMount () {
    // # uncheck all task each day
    // 1.get all current tasks and then update complete to false on all of them
    var self = this;
    function refreshTasks(){
      self.setState(
        Object.keys(self.state.tasks).map(task => {
          self.state.tasks[task].complete = false;
          self.state.tasks[task].disabled = false;
        })
      );
    }

    // 3. schedule the above with later.js,
    var s = later.parse.text('at 00:00 am');

    // var s = later.parse.text('every 5 sec');
    // use this for testing

    // 4.and set to local time
    later.setInterval(refreshTasks, s);

    // # Reset the streak at midnight
    function refreshStreak () {
      // if updatedToday = false then reset streak
      if (self.state.updatedToday === false) {
        let streak = {...self.state.streak};
        const reset = 0;
        streak = reset;
        self.setState(
          {streak}
        );
      }
    }

    later.setInterval(refreshStreak, s);
  }

  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  createTask (task) {
    const tasks = {...this.state.tasks};
    const timestamp = Date.now();
    tasks[`task-${timestamp}`] = task;
    this.setState({ tasks });
  }

  updateStreak () {
    // if all tasks are complete increment streak by one, just checcking status of all tasks here
    // SuperHack! did ths by putting each completed value in an array and then squishing into a string and then checking if it includes teh word true
    const tally = Object
      .keys(this.state.tasks)
      .map(task => this.state.tasks[task].complete).toString();
    if (!tally.includes('false')) {
      let streak = {...this.state.streak};
      streak = this.state.streak + 1;
      this.setState({ streak });
    }
    // change state to show streak has been updated so that it knows wheher to reset at midnight or not
    this.setState({
      updatedToday: true
    });
  }

  updateTask (key, updatedTask) {
    const tasks = {...this.state.tasks};
    tasks[key] = updatedTask;
    this.setState({ tasks }, this.updateStreak);
  }

  removeTask (key){
    const tasks = {...this.state.tasks};
    tasks[key] = null;
    this.setState({tasks});
    console.log('frog');
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
              removeTask={this.removeTask}
              />)
          }
        </ol>
        <Add createTask={this.createTask} />
      </div>
    );
  }
}

export default App;
