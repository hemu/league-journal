import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import {
  SignIn,
  SignUp,
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  Greetings,
  RequireNewPassword,
} from './AuthStep';

const PrivateComponent = (Comp) =>
  withAuthenticator(Comp, true, [
    <Greetings />,
    <SignIn federated={false} />,
    <SignUp />,
    <ConfirmSignIn />,
    <ConfirmSignUp />,
    <ForgotPassword />,
    <RequireNewPassword />,
  ]);

export default PrivateComponent;
