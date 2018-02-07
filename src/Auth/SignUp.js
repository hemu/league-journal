import React from 'react';
import PropTypes from 'prop-types';
import { Form, Control, actions } from 'react-redux-form';
import { isEmail, isEmpty } from 'validator';

// import { signupFormInitialState } from '../modules/authForm';
const required = (str) => !isEmpty(str);

const SignUp = ({}) => (
  <div>
    <h1>Sign Up</h1>
    <Form
      model="forms.signup"
      validators={{
        email: { required, isEmail },
        password: { required },
      }}
      onSubmit={() => console.log('Form submitted :)')}
    >
      <label>Email</label>
      <Control type="email" model=".email" />
      <label>Password</label>
      <Control type="password" model=".password" />
      <label>Summoner Name</label>
      <Control type="text" model=".summonerName" />
      <button type="submit">Submit</button>
    </Form>
  </div>
);

SignUp.propTypes = {
  // authenticated: PropTypes.bool.isRequired,
  // signUp: PropTypes.bool.isRequired,
};

export default SignUp;
