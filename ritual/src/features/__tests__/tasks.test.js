import React from 'react';
import { render, cleanup } from 'react-testing-library';
import App from '../../Auth/Auth';
import 'jest-dom/extend-expect'

afterEach(cleanup);

test('App starts', async () => {
  const { getByText } = render(<App />);
  expect(getByText('Name Your Ritual')).toBeInTheDocument();
});

// x create a task
// x complete a task
// x remove a task
// x complete a ritual
// x reset a day

// x signiup
// x create a rital
// x prevent people from signing up with duplicate ritual names
// firebase rules should only let you write to your own db
// logs in automatically if an existing user

// issues
// cancelling  task when list is complete updates the streak count
// forgot to add error state to app