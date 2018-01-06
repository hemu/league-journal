import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './api/client';
import './App.css';
import { EntriesMain } from './Entry';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/entry" component={EntriesMain} />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
