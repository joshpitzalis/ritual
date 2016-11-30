import React, { Component } from 'react';

class Add extends Component {

  createTask (event) {
    event.preventDefault();
    const task = { task: this.task.value };
    this.props.createTask(task);
    this.taskForm.reset();
  }

  render () {
    return (
      <form onSubmit={(e) => this.createTask(e)} ref={(input) => this.taskForm = input}>
        <input
          type='text'
          placeholder='Task Name'
          ref={(input) => this.task = input} />
        <button type='submit'>Add Task</button>
      </form>
    );
  }
}

export default Add;
