import React, { Component } from 'react';

class RitualPicker extends Component {

  goToRitual (event) {
    event.preventDefault();
    // first grab text from input
    const ritualId = this.ritualInput.value;
  // then transition to that ritual
    this.context.router.transitionTo(`/ritual/${ritualId}`);
  }
  render () {
    return (
      <form onSubmit={this.goToRitual.bind(this)}>
        <h2>Please Name Your Ritual</h2>
        <input type='text' ref={(input) => { this.ritualInput = input; }} />
        <button type='submit'>
          Begin Ritual
        </button>
      </form>
    );
  }
}

// add context to be able to use the router to transition from page to page
RitualPicker.contextTypes = {
  router: React.PropTypes.Object
};

export default RitualPicker;
