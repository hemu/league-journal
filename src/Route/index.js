import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { routerHistory } from '../store';
import Entry from '../Entry';
import LandingPage from '../Landing';
import PrivateRoute from './PrivateRoute';

export default () => (
  <ConnectedRouter history={routerHistory}>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route path="/signup" component={SignUp} /> */}
        <PrivateRoute path="/entry" component={Entry} />
      </Switch>
    </div>
  </ConnectedRouter>
);
