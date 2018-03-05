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

import { fetchSummonerAccount } from '../../api/riot';
import { userAttrMap } from '../../api/user';

export default class SignUp extends AuthPiece {
  constructor(props) {
    super(props);

    this._validAuthStates = ['signUp'];
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { password, email, summonerName } = this.inputs;
    return fetchSummonerAccount(summonerName).then((result) => {
      if (!result || !result.summonerId) {
        return this.error(
          `Riot is telling us ${summonerName} doesn't exist :( Remember this isn't your riot username, it's your summoner name.`,
        );
      }
      return Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          [userAttrMap.summonerName]: summonerName,
          [userAttrMap.summonerId]: `${result.summonerId}`,
        },
      })
        .then(() => this.changeState('confirmSignUp', email))
        .catch((err) => {
          console.log(err);
          return this.error(err);
        });
    });
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
            key="summonerName"
            name="summonerName"
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
