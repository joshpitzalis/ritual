import React, { Component } from 'react';

class Add extends Component {

  create (event) {
    event.preventDefault();
    const task = {
      name: this.task.value,
      complete: false,
      disabled: false
    };
    this.props.createTask(task);
    this.taskForm.reset();
  }

  render () {
    return (
      <form
        onSubmit={(e) => this.create(e)}
        ref={(input) => this.taskForm = input}>
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
