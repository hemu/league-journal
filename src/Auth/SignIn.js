import React from 'react';
import PropTypes from 'prop-types';
import { Form, Control, actions } from 'react-redux-form';
import { isEmail, isEmpty } from 'validator';

const required = (str) => !isEmpty(str);

const SignIn = ({}) => (
  <div>
    <h1>Sign In</h1>
    <Form
      model="forms.signin"
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
      <button type="submit">Submit</button>
    </Form>
  </div>
);

SignIn.propTypes = {
  // authenticated: PropTypes.bool.isRequired,
  // signUp: PropTypes.bool.isRequired,
};

export default SignIn;
