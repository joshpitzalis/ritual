import React, { Component } from 'react';

class Task extends Component {

  constructor (props) {
    super(props);
    this.togglChecked = this.togglChecked.bind(this);
  }

  togglChecked () {
    const task = this.props.details;
    const updatedTask = { ...task, complete: true, disabled: true };
    this.props.updateTask(this.props.index, updatedTask);
  }

  render () {
    return (
      <li onChange={() => this.togglChecked()}>
        <input
          type='checkbox'
          checked={this.props.details.complete}
          disabled={this.props.details.disabled} />
        {this.props.details.name}
      <button onClick={()=>this.props.removeTask(this.props.index)}>x</button></li>
    );
  }
}

export default Task;
