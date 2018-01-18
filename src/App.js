import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './api/client';
import './App.css';
import Entry from './Entry';
import Dashboard from './Dashboard';

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/entry" component={Entry} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
