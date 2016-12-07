import React, { Component } from 'react';

class Task extends Component {

  constructor () {
    super();
    this.togglChecked = this.togglChecked.bind(this);
  }

  togglChecked () {
    const task = this.props.details;
    // this.props.details.complete = true;
    const updatedTask = {...task,
      complete: true};
    this.props.updateTask(this.props.index, updatedTask);
  }

  render () {
    return (
      <li style={{
      textDecoration: this.props.details.complete ? 'line-through' : 'none'
    }}>
        <input type='checkbox' onChange={() => this.togglChecked()} />
        {this.props.details.name}</li>
    );
  }
}

export default Task;
