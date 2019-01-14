import React, { Component } from 'react';
import Streak from '../../components/Streak';

import Add from '../../components/Add';
import TaskList from '../TaskList/TaskList';

import { auth, twitterAuthProvider } from '../../utils/firebase';
import { State, withStateMachine } from 'react-automata';

const authMachine = {
  // Initial state
  initial: 'loggedOut',

  // State definitions
  states: {
    loggedOut: {
      onEntry: 'logout',
      on: {
        LOGGEDIN: 'loading'
      }
    },
    loading: {
      onEntry: 'authenticate',
      on: {
        SUCCEEDED: 'loggedIn',
        FAILED: 'error'
      }
    },
    loggedIn: {
      on: {
        LOGGEDOUT: 'loggedOut'
      }
    },
    error: {
      on: {
        RETRIED: 'loading',
        FAILED: 'loggedOut'
      }
    }
  }
};

class App extends Component {
  authenticate = () => {
    const { transition } = this.props;
    console.log('authenticating...');
    auth
      .signInWithPopup(twitterAuthProvider)
      .then(userDetails => transition('SUCCEEDED', { userDetails }))
      .catch(error => transition('FAILED', { error }));
  };

  logout = () => {
    auth.signOut();
  };

  render() {
    const { transition, userDetails } = this.props;

    return (
      <div>
        <header className="black-80 tc pv4 avenir">
          <h1 className="mt2 mb0 baskerville i fw1 f1">Ritual</h1>

          <nav className="tc mw7 center mt4">
            <State
              is={['loggedOut', 'loading']}
              render={visible =>
                visible && (
                  <button onClick={() => transition('LOGGEDIN')}>
                    Login with Twitter To Create A Ritual.
                  </button>
                )
              }
            />

            <State
              is="loggedIn"
              render={visible =>
                visible &&
                userDetails && (
                  <main>
                    <button
                      onClick={() => transition('LOGGEDOUT')}
                      className="f6 f5-l bg-animate black-80 pointer dim dib pa3 ph4-l"
                    >
                      Log Out
                    </button>
                    <Streak ritualId={userDetails.user.uid} />
                    <TaskList user={userDetails.user.uid} />
                    <Add ritualId={userDetails.user.uid} />
                  </main>
                )
              }
            />
          </nav>
        </header>

        <footer className="pv4 ph3 ph5-m ph6-l mid-gray mw7 center avenir">
          <small className="f6 db tc">
            If you find a bug{' '}
            <a href="https://twitter.com/joshpitzalis">let me know.</a>
          </small>
        </footer>
      </div>
    );
  }
}

export default withStateMachine(authMachine)(App);
