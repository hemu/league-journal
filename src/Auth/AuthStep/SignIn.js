import React, { Component } from 'react';
import { Auth, I18n, Logger, JS } from 'aws-amplify';

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

const logger = new Logger('SignIn');

export default class SignIn extends AuthPiece {
  constructor(props) {
    super(props);

    this.checkContact = this.checkContact.bind(this);
    this.signIn = this.signIn.bind(this);

    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
    this.state = {};
  }

  checkContact(user) {
    Auth.verifiedContact(user).then((data) => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState('signedIn', user);
      } else {
        user = Object.assign(user, data);
        this.changeState('verifyContact', user);
      }
    });
  }

  signIn() {
    const { username, password } = this.inputs;
    Auth.signIn(username, password)
      .then((user) => {
        logger.debug(user);
        if (user.challengeName === 'SMS_MFA') {
          this.changeState('confirmSignIn', user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          logger.debug('require new password', user.challengeParam);
          this.changeState('requireNewPassword', user);
        } else {
          this.checkContact(user);
        }
      })
      .catch((err) => {
        this.error(err);
      });
  }

  showComponent(theme) {
    const { authState, hide, onStateChange } = this.props;
    if (hide && hide.includes(SignIn)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>
          {I18n.get('Sign In Account')}
        </SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Username')}
            theme={theme}
            key="username"
            name="username"
            onChange={this.handleInputChange}
          />
          <InputRow
            placeholder={I18n.get('Password')}
            theme={theme}
            key="password"
            type="password"
            name="password"
            onChange={this.handleInputChange}
          />
          <ButtonRow theme={theme} onClick={this.signIn}>
            {I18n.get('Sign In')}
          </ButtonRow>
        </SectionBody>
        <SectionFooter theme={theme}>
          <div style={theme.col6}>
            <Link
              theme={theme}
              onClick={() => this.changeState('forgotPassword')}
            >
              {I18n.get('Forgot Password')}
            </Link>
          </div>
          <div style={Object.assign({ textAlign: 'right' }, theme.col6)}>
            <Link theme={theme} onClick={() => this.changeState('signUp')}>
              {I18n.get('Sign Up')}
            </Link>
          </div>
        </SectionFooter>
      </FormSection>
    );
  }
}
