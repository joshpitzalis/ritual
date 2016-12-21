import React, { Component } from 'react';

class Task extends Component {

  constructor (props) {
    super(props);
    this.togglChecked = this.togglChecked.bind(this);
  }

  togglChecked () {
    const task = this.props.details;
    const updatedTask = { ...task, complete: !task.complete };
    this.props.updateTask(this.props.index, updatedTask);
  }

  render () {
    return (
      <li onChange={() => this.togglChecked()} style={{
        textDecoration: this.props.details.complete ? 'line-through' : 'none'}}>
        <input type='checkbox'/>
        {this.props.details.name}</li>
    );
  }
}

export default Task;
