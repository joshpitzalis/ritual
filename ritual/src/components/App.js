import React, { Component } from 'react';
import Streak from './Streak';
import Task from './Task';
import Add from './Add';
import 'console-dot-frog';
import later from 'later';
import base from '../base';

class App extends Component {

  constructor () {
    super();
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.updateStreak = this.updateStreak.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      tasks: {},
      streak: 0,
      updatedToday: false,
      uid: null,
      owner: null
    };
  }

  componentWillMount () {
    this.ref = base.syncState(`${this.props.params.ritualId}/tasks`, {
      context: this,
      state: 'tasks'
    });
  }

  componentDidMount () {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, {user});
      }
    });

    // # uncheck all task each day
    // 1.get all current tasks and then update complete to false on all of them

    var self = this;
    function refreshTasks () {
      self.setState(
        Object.keys(self.state.tasks).map(task => {
          self.state.tasks[task].complete = false;
          self.state.tasks[task].disabled = false;
        })
      );
    }

    // 3. schedule the above with later.js,
    var s = later.parse.text('at 00:00 am');

    // var s = later.parse.text('every 5 sec');
    // use this for testing

    // 4.and set to local time
    later.setInterval(refreshTasks, s);

    // # Reset the streak at midnight
    function refreshStreak () {
      // if updatedToday = false then reset streak
      if (self.state.updatedToday === false) {
        let streak = {...self.state.streak};
        const reset = 0;
        streak = reset;
        self.setState(
          {streak}
        );
      }
    }

    later.setInterval(refreshStreak, s);

    // check to see if streak needs updating
    var l = later.parse.text('every 5 sec');

    function upStreak () {
      // i tried to update streak as a call back on setState in updateTask but teh call back wuld not fire for some reason. This is a superhack but it let me move forward.
      if (self.state.updatedToday === false) {
        self.updateStreak();
        console.log('updating...');
      }
    }

    later.setInterval(upStreak, l);

  }

  componentWillUpdate (nextProps, nextState){
    localStorage.setItem(`streak-${this.props.params.ritualId}`, nextState.streak)
  }

  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  createTask (task) {
    const tasks = {...this.state.tasks};
    const timestamp = Date.now();
    tasks[`task-${timestamp}`] = task;
    this.setState({ tasks });
  }

  updateStreak () {
    // if all tasks are complete increment streak by one, just checking status of all tasks here
    // SuperHack! did this by putting each completed value in an array and then squishing into a string and then checking if it includes teh word true
    var tally = Object
      .keys(this.state.tasks)
      .map(task => this.state.tasks[task].complete).toString();
    console.log(tally)
    if (!tally.includes('false') && Object.keys(this.state.tasks).length >= 1) {
      let streak = {...this.state.streak};
      streak = this.state.streak + 1;
      this.setState({ streak, updatedToday: true });
        // change state to show streak has been updated so that it knows wheher to reset at midnight or not

    }


  }

  updateTask (key, updatedTask) {
    var self = this;
    const tasks = {...this.state.tasks};
    tasks[key] = updatedTask;
    this.setState({ tasks });

  }

  removeTask (key){
    const tasks = {...this.state.tasks};
    tasks[key] = null;
    this.setState({tasks});
  }

  renderLogin () {
    return(
      <button onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
    )
  }

  authenticate (provider) {
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler (err, authData) {
    console.log(authData)
    if (err) {
      console.error(err);
      return;
    }

    base.database().ref(this.props.params.ritualId).once('value', (snapshot) => {
      const data = snapshot.val() || {};
      if (!data.owner) {
        base.database().ref(this.props.params.ritualId).set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  logout () {
    base.unauth();
    this.setState({uid: null});
  }

  render () {
    const logout = <button onClick={this.logout}>Log Out</button>

    const {tasks, streak, completed} = this.state;

    // check if anyone is logged in
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (<div><p>Sorry, this is not your ritual.</p>{logout}</div>)
    }
    return (
      <div>
        {logout}
        <Streak streak={streak} />
        <ol>
          {Object
            .keys(tasks)
            .map(key => <Task
              key={key}
              index={key}
              details={tasks[key]}
              updateTask={this.updateTask}
              completed={completed}
              count={tasks}
              removeTask={this.removeTask}
              />)
          }
        </ol>
        <Add createTask={this.createTask} />
        <button onClick={() => this.updateStreak()}>streak</button>
      </div>
    );
  }
}

export default App;
