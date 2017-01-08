import React, { Component } from 'react';
import logo from '../../public/deity.svg';

class Diety extends Component {

  render () {
    if (this.props.streak === 0) {
      return (
        <div>
          <h1 className='mt2 mb0 baskerville i fw1 f1'>Ritual</h1>
        </div>
      );
    } else {
      return (
        <div>
          <a href='#' title='Pattern By Mario Ramírez' className='noPointer'><img src={logo} className='App-logo' alt='logo' /></a>
        </div>
      );
    }
  }
}

export default Diety;
