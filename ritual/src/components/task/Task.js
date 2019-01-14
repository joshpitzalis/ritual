import React, { Component } from 'react';
import { db } from '../../utils/firebase';

class Task extends Component {

  togglChecked = () => {
    const task = this.props.details;
    const updatedTask = { ...task, complete: true, disabled: true };
    this.props.updateTask(this.props.details.key, updatedTask);

    const lastUsed = new Date().toDateString();

      // update last used field
      db.ref(`${this.props.user}`).update({
        lastUsed
      });
   
  }

  render () {
    return (
      <li  className="flex lh-copy pa3 ph0-l bb b--black-10 content-center avenir">
        <input
          type='checkbox'
          checked={this.props.details.complete}
          onChange={() => this.togglChecked()}
          disabled={this.props.details.disabled}
          className="w2 h2 w3-ns h3-ns br-100" />
        <div className="pl3 flex-auto ttu">
          <span className="f6 db black-70">{this.props.details.name}</span>
        </div>

      <button onClick={() => this.props.removeTask(this.props.details.key)} className="b ph3 pv1 input-reset bn b--black bg-transparent grow pointer f6 dib"><span className="f6 db black-70">x</span></button></li>
    );
  }
}

export default Task;
