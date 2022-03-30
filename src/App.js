import React              from 'react';
import { Switch, Route }  from 'react-router-dom';

import './index.scss';

// Components
import Navbar             from 'pages/Layout/Navbar';
import Hash               from 'pages/Hash/Hash';
import Block              from 'pages/Block/Block';
import Blockchain         from 'pages/Blockchain/Blockchain';
import Distributed        from 'pages/Distributed/Distributed';
import Tokens             from 'pages/Tokens/Tokens';
import Coinbase           from 'pages/Hello/Derp';

function App() {
  // console.log({ REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT });

  return (
    <div className="App">
      <Navbar/>

      <div className="my-4 px-8">
        <Switch>
          <Route exact path="/"       component={ Hash } />
          <Route path="/block"        component={ Block } />
          <Route path="/blockchain"   component={ Blockchain } />
          <Route path="/distributed"  component={ Distributed } />
          <Route path="/tokens"       component={ Tokens } />
          <Route path="/coinbase"     component={ Coinbase } />
        </Switch>
      </div>
    </div>
  );
}

export default App;