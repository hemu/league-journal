import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';
import client from './api/client';
import { routerHistory } from './store';
import NavBar from './Navigation';
import './App.css';
import Entry from './Entry';
// import SignIn from './Auth/SignIn';
// import SignUp from './Auth/SignUp';
import Callback from './Auth/Callback';
import { handleAuthentication } from './Auth';

const authenticate = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    handleAuthentication();
  }
};

const MainContainer = () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/entry" component={Entry} />
      <Route
        path="/callback"
        render={(props) => {
          authenticate(props);
          return <Callback {...props} />;
        }}
      />
    </Switch>
  </div>
);

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ConnectedRouter history={routerHistory}>
        <MainContainer />
      </ConnectedRouter>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
