import React, { Component } from 'react';
import Points from './points';
import Task from './Task';
import Add from './Add';

class App extends Component {

  constructor () {
    super();
    this.createTask = this.createTask.bind(this);
    this.state = {
      tasks: {}
    };
  }

  createTask (task) {
    const tasks = {...this.state.tasks};
    const timestamp = Date.now();
    tasks[`task-${timestamp}`] = task;
    this.setState({tasks});
  }

  render () {
    return (
      <div>
        <Points count={this.state.tasks} />
        <ol>
          {Object
            .keys(this.state.tasks)
            .map(key => <Task
              key={key}
              details={this.state.tasks[key]
              }
               />)
          }
        </ol>
        <Add createTask={this.createTask} />
      </div>
    );
  }
}

export default App;
