import React, { Component } from 'react';

import { Auth, I18n } from 'aws-amplify';

import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  Link,
  AuthPiece,
} from 'aws-amplify-react';

export default class SignUp extends AuthPiece {
  constructor(props) {
    super(props);

    this._validAuthStates = ['signUp'];
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { password, email, summoner } = this.inputs;
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        'custom:summoner': summoner,
      },
    })
      .then(() => this.changeState('confirmSignUp', email))
      .catch((err) => this.error(err));
  }

  showComponent(theme) {
    const { hide } = this.props;
    if (hide && hide.includes(SignUp)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>
          {I18n.get('Sign Up Account')}
        </SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Email')}
            theme={theme}
            key="email"
            name="email"
            onChange={this.handleInputChange}
          />
          <InputRow
            placeholder={I18n.get('Password')}
            theme={theme}
            type="password"
            key="password"
            name="password"
            onChange={this.handleInputChange}
          />
          <InputRow
            placeholder={I18n.get('Summoner Name')}
            theme={theme}
            key="summoner"
            name="summoner"
            onChange={this.handleInputChange}
          />
          <ButtonRow onClick={this.signUp} theme={theme}>
            {I18n.get('Sign Up')}
          </ButtonRow>
        </SectionBody>
        <SectionFooter theme={theme}>
          <div style={theme.col6}>
            <Link
              theme={theme}
              onClick={() => this.changeState('confirmSignUp')}
            >
              {I18n.get('Confirm Email')}
            </Link>
          </div>
          <div style={Object.assign({ textAlign: 'right' }, theme.col6)}>
            <Link theme={theme} onClick={() => this.changeState('signIn')}>
              {I18n.get('Sign In')}
            </Link>
          </div>
        </SectionFooter>
      </FormSection>
    );
  }
}
