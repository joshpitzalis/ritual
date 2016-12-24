import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import 'normalize.css';
import RitualPicker from './components/RitualPicker';
import NotFound from './components/NotFound';
import { BrowserRouter, Match, Miss } from 'react-router';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={RitualPicker} />
        <Match pattern='/ritual/:ritualId' component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
