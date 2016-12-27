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
        ref={(input) => this.taskForm = input}
        className='measure center' >
        <input
          type='text'
          placeholder='Add New Tasks To Your Ritual Here.'
          ref={(input) => this.task = input}
          className=' tc pa2 input-reset bn bg-transparent hover-bg-black hover-white w-100' />
      </form>
    );
  }
}

export default Add;
