import React, { Component } from 'react';

class RitualPicker extends Component {

  goToRitual (event) {
    event.preventDefault();
    // first grab text from input
    const ritualId = this.ritualInput.value;
  // then transition to that ritual
  this.props.history.push(`/ritual/${ritualId}`)
    // this.context.router.transitionTo(`/ritual/${ritualId}`);
  }
  render () {
    return (
      <form onSubmit={this.goToRitual.bind(this)} className='pa4 black-80'>
        <div className="measure-narrow">
        <h2 className='f1' >Name Your Ritual</h2>
        <input type='text' ref={(input) => { this.ritualInput = input; }} className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' />
          <small className="f6 lh-copy black-60 db mb2">
        This will be the name of the URL you can bookmark later.
      </small>
        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type='submit'>
          Sign Up With twitter
        </button>
      </div>
      </form>
    );
  }
}

// add context to be able to use the router to transition from page to page
// RitualPicker.contextTypes = {
//   router: React.PropTypes.Object
// };

export default RitualPicker;
