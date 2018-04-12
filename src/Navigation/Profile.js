import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const MainBtn = styled(Button)`
  &&& {
    background-color: #fff;
    min-width: 100px;
  }
`;

// import { Dropdown, Icon } from 'semantic-ui-react';

// const trigger = (name) => (
//   <span>
//     <Icon name="user" size="small" />
//     {name}
//   </span>
// );

// const options = [
//   { key: 'signout', text: 'Sign Out', icon: 'sign out' },
//   { key: 'password', text: 'Change Password', icon: 'settings' },
// ];

// function handleChange(e, value) {
//   console.log(value);
// }

// const ProfileButton = ({ name, signOut }) => (
//   <Dropdown
//     onChange={handleChange}
//     trigger={trigger(name)}
//     options={options}
//     pointing="top left"
//     icon={null}
//   />
// );

// ProfileButton.propTypes = {
//   name: PropTypes.string.isRequired,
//   signOut: PropTypes.func.isRequired,
// };

const ProfileButton = ({ name, signOut }) => (
  <MainBtn animated>
    <Button.Content visible>{name}</Button.Content>
    <Button.Content hidden>
      <Icon name="sign out" />Sign out
    </Button.Content>
  </MainBtn>
);

export default ProfileButton;
