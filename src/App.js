import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';
import client from './api/client';
import { routerHistory } from './store/reduxStore';
import Navbar from './Navigation';
import './App.css';
import Entry from './Entry';
import Dashboard from './Dashboard';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
`;

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ConnectedRouter history={routerHistory}>
        <MainContainer>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Navbar />
            <Route exact path="/" component={Dashboard} />
            <Route path="/entry" component={Entry} />
          </Switch>
        </MainContainer>
      </ConnectedRouter>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
