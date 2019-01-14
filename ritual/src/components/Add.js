import React, { Component } from 'react';
import { db } from '../utils/firebase';

class Add extends Component {
  create (event) {
    event.preventDefault();
    
    const task = {
      name: this.task.value,
      complete: false,
      disabled: false
    };

    db.ref(`${this.props.ritualId}/tasks/task-${Date.now()}`)
    .set(task)
    this.taskForm.reset();
  }

  render () {
    return (
      <form
        onSubmit={(e) => this.create(e)}
        ref={(input) => this.taskForm = input}
        className='measure center pv4' >
        <input
          type='text'
          placeholder='+ Add Tasks'
          ref={(input) => this.task = input}
          className=' tc pa2 input-reset bn bg-transparent hover-bg-black hover-white w-100 avenir ttu' />
      </form>
    );
  }
}

export default Add;
