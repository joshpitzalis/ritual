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
      <li onChange={() => this.togglChecked()} className="flex lh-copy pa3 ph0-l bb b--black-10 content-center avenir">
        <input
          type='checkbox'
          checked={this.props.details.complete}
          disabled={this.props.details.disabled}
          className="w2 h2 w3-ns h3-ns br-100" />
        <div className="pl3 flex-auto ttu">
          <span class="f6 db black-70">{this.props.details.name}</span>
        </div>

      <button onClick={() => this.props.removeTask(this.props.index)} className="b ph3 pv1 input-reset bn b--black bg-transparent grow pointer f6 dib"><span class="f6 db black-70">x</span></button></li>
    );
  }
}

export default Task;
