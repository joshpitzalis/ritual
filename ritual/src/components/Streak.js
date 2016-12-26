import React, { Component } from 'react';

class Streak extends Component {

  render () {
    return (
      <div>
        <p>
          Streak:
          {this.props.streak}
        </p>
      </div>
    );
  }
}

export default Streak;
