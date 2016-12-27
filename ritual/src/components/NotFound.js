import React, { Component } from 'react';

class NotFound extends Component {
  render () {
    return (
      <section className='vh-100'>
        <header className='tc ph5 lh-copy'>
          <h1 className='f1 f-headline-l code mb3 fw9 dib tracked-tight '>404</h1>
          <h2 className='tc f1-l fw1'>Sorry, can't find the page you are looking for.</h2>
        </header>
      </section>
    );
  }
}

export default NotFound;
