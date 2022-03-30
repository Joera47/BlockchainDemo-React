import React                          from 'react';
import { Switch, Route }              from 'react-router-dom';

import './index.scss';

// Components
import Navbar                         from './components/Layout/Navbar';
import Hash                           from './components/Hash/Hash';
import Block                          from './components/Block/Block';
import Derp                           from './components/Hello/Derp';

function App() {
  // console.log({ REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT });

  return (
    <div className="App">
      <Navbar/>

      <div className="my-4 px-8">
        <Switch>
          <Route exact path="/"       component={ Hash } />
          <Route path="/block"        component={ Block } />
          <Route path="/blockchain"   component={ Derp } />
          <Route path="/distributed"  component={ Derp } />
          <Route path="/tokens"       component={ Derp } />
          <Route path="/coinbase"     component={ Derp } />
        </Switch>
      </div>
    </div>
  );
}

export default App;