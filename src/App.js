import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import client from './api/client';
import { routerHistory } from './store/reduxStore';
import './App.css';
import Entry from './Entry';
import Dashboard from './Dashboard';

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ConnectedRouter history={routerHistory}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/entry" component={Entry} />
        </Switch>
      </ConnectedRouter>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
