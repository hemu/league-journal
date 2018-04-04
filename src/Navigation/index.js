import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { signOut } from '../modules/auth';
import { logout } from '../Auth';

const MainBar = styled.div`
  height: 30px;
  background-color: #ffffff;
  border-bottom: solid 1px #dddddd;
  text-align: right;
`;

const NavBar = ({ summoner, isAuthenticated, signOut }) => {
  if (isAuthenticated) {
    return (
      <MainBar>
        {' '}
        {summoner}{' '}
        <Button
          size="mini"
          onClick={() => {
            logout();
            signOut();
          }}
        >
          Logout
        </Button>
      </MainBar>
    );
  }
  return <a href="#">Login</a>;
};
NavBar.propTypes = {
  summoner: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  ({ auth }) => ({
    summoner: auth.summoner,
    isAuthenticated: auth.isAuthenticated,
  }),
  (dispatch) => ({
    signOut: () => dispatch(signOut()),
  }),
)(NavBar);
