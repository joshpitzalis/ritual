import React, { Component } from 'react';

class Points extends Component {
  render () {
    return (
      <div>
        <p>Total Tasks: {Object
            .keys(this.props.count).length}</p>
          <p>Completed Tasks: </p>
      </div>
    );
  }
}

export default Points;
