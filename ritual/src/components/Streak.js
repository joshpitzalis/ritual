import React, { Component } from 'react';
import { db } from '../utils/firebase';

class Streak extends Component {
  state = {
    streak: 0
  };
  
  componentDidMount() {

    this.props.ritualId &&
      db
        .ref(`${this.props.ritualId}/streak`)
        .on(
          'value',
          snap => snap.exists && this.setState({ streak: snap.val() })
        );
  }

  render() {
    return (
      <div className="mt2 mb0 f6 fw4 ttu tracked">
        <p>{this.state.streak} Rituals in a Row</p>
      </div>
    );
  }
}

export default Streak;
