import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Vote from './screens/Vote';
import Dashboard from './screens/Dashboard';

function App() {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route key={'index'} path={'/'} name={'Index'} exact={true} render={props => (
            <Vote {...props} />
          )} />

          <Route key={'dashboard'} path={'/dashboard'} name={'Dashboard'} exact={true} render={props => (
            <Dashboard {...props} />
          )} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;