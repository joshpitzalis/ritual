import React, { Component } from 'react';
import Streak from './Streak';
import Task from './Task';
import Add from './Add';
import 'console-dot-frog';
import later from 'later';
import base from '../base';
import moment from 'moment';

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
      updatedToday: null,
      uid: null,
      owner: null
    };
  }

  componentWillMount () {
    this.ref = base.syncState(`${this.props.params.ritualId}/tasks`, {
      context: this,
      state: 'tasks'
    });

    const localStorageRef = localStorage.getItem(`streak-${this.props.params.ritualId}`);
    if (localStorageRef) {
      this.setState({
        streak: localStorageRef
      });
    }

    // check if streak was updated yesterday, if not set streak to zero
    if (this.state.updatedToday + 1 < moment().dayOfYear()) {
      let streak = {...this.state.streak};
      const reset = 0;
      streak = reset;
      this.setState(
        {streak}
      );
    }

    // # uncheck all task each day
    if (this.state.updatedToday < moment().dayOfYear()) {
      this.setState(
        Object.keys(this.state.tasks).map(task => {
          this.state.tasks[task].complete = false;
          this.state.tasks[task].disabled = false;
        })
      );
    }

  }

  componentDidMount () {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, {user});
      }
    });


    // check to see if streak needs updating
    var l = later.parse.text('every 1 sec');
    const self = this;
    function upStreak () {
      // i tried to update streak as a call back on setState in updateTask but teh call back wuld not fire for some reason. This is a superhack but it let me move forward.

      if (self.state.updatedToday !== moment().dayOfYear() ) {
        self.updateStreak();
      }
    }

    later.setInterval(upStreak, l);

  }

  componentWillUpdate (nextProps, nextState){
    localStorage.setItem(`streak-${this.props.params.ritualId}`, nextState.streak);
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
    // console.log(tally)
    if (!tally.includes('false') && Object.keys(this.state.tasks).length >= 1) {
      let streak = {...this.state.streak};
      streak = this.state.streak + 1;
      this.setState({ streak, updatedToday: moment().dayOfYear() });
        // change state to show streak has been updated so that it knows wheher to reset at midnight or not
    }
  }

  updateTask (key, updatedTask) {
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
    // console.log(authData)
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
      </div>
    );
  }
}

export default App;
