import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { signOut } from '../modules/auth';
import { logout } from '../Auth';
import ProfileButton from './Profile';

const MainBar = styled.div`
  height: 40px;
  background-color: #ffffff;
  border-bottom: solid 1px #dddddd;
  text-align: right;
  font-size: 18px;
  padding: 0 50px;
`;

const ProfileBtn = styled(Button)`
  background-color: #fff;
`;

const activeItem = '';

function handleClick() {}

const NavBar = ({ summoner, isAuthenticated, signOut }) => {
  if (isAuthenticated) {
    return (
      // <MainBar>
      //   <ProfileButton name={summoner} signOut={signOut} />
      // </MainBar>
      <Menu stackable>
        <Menu.Item>
          <div>LJ</div>
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === 'features'}
          onClick={handleClick}
        >
          DASHBOARD
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === 'testimonials'}
          onClick={handleClick}
        >
          ABOUT
        </Menu.Item>

        <Menu.Item
          name="sign-in"
          active={activeItem === 'sign-in'}
          // onClick={handleClick}
        >
          <ProfileButton name={summoner} signOut={signOut} />
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu stackable>
      <Menu.Item>
        <div>LJ</div>
      </Menu.Item>

      <Menu.Item
        name="sign-in"
        active={activeItem === 'sign-in'}
        onClick={handleClick}
      >
        Sign-in
      </Menu.Item>
    </Menu>
  );
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
