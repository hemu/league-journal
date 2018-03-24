import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import Amplify from 'aws-amplify';
import './App.css';
import client from './api/client';
import Routes from './Route';

window.LOG_LEVEL = 'DEBUG';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:731e288f-b489-46b8-9721-b70e91af4e3c',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_yiM257UGL',
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: '3mhmofc7vrmqbuerck3r5iufs9',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  // API: {
  //   endpoints: [
  //     {
  //       name: 'recentGames',
  //       // endpoint: 'http://localhost:8080/recentGames',
  //       endpoint:
  //         'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/recentGames',
  //       service: 'lambda',
  //       region: 'us-east-1',
  //     },
  //     {
  //       name: 'matchDetail',
  //       endpoint: 'http://localhost:8080/matchDetail',
  //       service: 'lambda',
  //       region: 'us-east-1',
  //     },
  //   ],
  // },
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
