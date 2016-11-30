import React, { Component } from 'react';

class Task extends Component {

  render () {
    return (
      <li>
        <input type='checkbox' />
        {this.props.details.name}</li>
    );
  }
}

export default Task;
