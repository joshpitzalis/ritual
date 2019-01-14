import React from 'react';
import ReactDOM from 'react-dom';
import App from './features/Auth';
import './index.css';
import 'normalize.css';


// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// const Root = () => {
//   return (
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route exact path="/" component={RitualPicker} />
//           <Route path="/ritual/:ritualId" 
//           component={App}/>
//           <Route component={NotFound} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// };




ReactDOM.render(<App />, document.getElementById('root'));




