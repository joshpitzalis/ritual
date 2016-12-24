import React, { Component } from 'react';

class RitualPicker extends Component {
  render () {
    return (
      <form className='storeSelector'>
        <h2>Please Name Your Ritual</h2>
        <input type='text' />
        <button type='submit'>
          Begin Ritual
        </button>
      </form>
    );
  }
}

export default RitualPicker;
