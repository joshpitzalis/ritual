import React, { useEffect, useState } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { list } from 'rxfire/database';
import { map } from 'rxjs/operators';
import { db } from '../../utils/firebase';
import Task from '../../components/task/Task';

const TaskList = ({ user }) => {
  const [tasks, setTask] = useState({});

  useEffect(() => {
    const userTasks$ = list(db.ref(`${user}/tasks`))
      .pipe(
        map(data => {
          return data.map(datum => ({
            key: datum.snapshot.key,
            ...datum.snapshot.val()
          }));
        })
      )
      .subscribe(tasks => setTask(tasks));

    resetTasksOnNewDay();

    return () => {
      // Clean up the subscription
      userTasks$.unsubscribe();
    };
  }, []);

  useEffect(
    () => {
      let allTasksCompleted =
        tasks && Object.values(tasks).every(task => task.complete === true);

      const today = new Date().toDateString();
      // check that all tasks are completed
      if (allTasksCompleted) {
        db.ref(user)
          .once('value')
          .then(snap => {
            if (snap.val().lastCompletedOn !== today) {
              db.ref(user).update({
                streak: (Number(snap.val().streak) || 0) + 1,
                lastCompletedOn: new Date().toDateString()
              });
            }
          });
      }
    },
    [tasks]
  );

  const resetTasksOnNewDay = async () => {
    const lastUsed = await db
      .ref(`${user}/lastUsed`)
      .once('value')
      .then(snap => snap.val());

    const today = new Date().toDateString();

    if (lastUsed && lastUsed !== today) {
      let freshTasks = await db
        .ref(`${user}/tasks`)
        .once('value')
        .then(snap => snap.val());

      for (var task in freshTasks) {
        console.log('task', task);
        freshTasks[task].complete = false;
        freshTasks[task].disabled = false;
      }
      db.ref(`${user}/tasks`).set(freshTasks);
    }
  };

  const updateTask = (key, updatedTask) =>
    db.ref(`${user}/tasks/${key}`).update(updatedTask);

  const removeTask = key => db.ref(`${user}/tasks/${key}`).remove();

  return (
    <div className="bt bb">
      <CSSTransitionGroup
        component="ol"
        transitionName="tasks"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        className="list pl0 mt0 measure center tasks"
      >
        {Object.keys(tasks).map(key => (
          <Task
            key={key}
            index={key}
            details={tasks[key]}
            updateTask={updateTask}
            count={tasks}
            removeTask={removeTask}
            user={user}
          />
        ))}
      </CSSTransitionGroup>
    </div>
  );
};

export default TaskList;
