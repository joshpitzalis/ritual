import React, { Component } from 'react';

class Streak extends Component {

  render () {
    return (
      <div className='mt2 mb0 f6 fw4 ttu tracked'>
        <p>
          {this.props.streak} Rituals in a Row
        </p>
      </div>
    );
  }
}

export default Streak;
