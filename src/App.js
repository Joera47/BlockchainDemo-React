import React                          from 'react';
import { Switch, Route, withRouter }  from 'react-router-dom';

import './index.scss';

// Components
import Hello                          from './components/Hello/Hello';
import Derp                           from './components/Hello/Derp';

function App() {
  // console.log({ REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT });

  return (
    <div className="App">
      <div>
        <Switch>
          <Route exact path="/"                  component={ Hello } />
          <Route path="/hello"                   component={ Derp } />
        </Switch>
      </div>
    </div>
  );
}

export default App;