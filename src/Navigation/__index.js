import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  &&&&& {
    width: 100%;
    ${'' /* border-right-width: 5px; */};
  }
`;

const ActiveMenuItem = styled(Menu.Item)`
  &&&&&&& {
    ${'' /* color: #38474f; */} color: #FFF;
    border-color: #fff;
    background-color: #38474f;
  }
`;

const StyledLink = styled(Link)`
  &&& .item {
    color: #999;
  }
  &&&&&&&& .item {
    ${'' /* border-right-width: 5px; */};
  }
`;

const DashItem = ({ active, icon, title, name, onClick, path }) =>
  active ? (
    <ActiveMenuItem name={name} active={active} onClick={onClick} as={'div'}>
      <Icon name={icon} />
      {title}
    </ActiveMenuItem>
  ) : (
    <StyledLink to={path}>
      <Menu.Item name={name} active={active} onClick={onClick} as={'div'}>
        <Icon name={icon} />
        {title}
      </Menu.Item>
    </StyledLink>
  );

// dashboard
// list layout
// setting

export default class MenuExampleVerticalSecondary extends Component {
  state = { activeItem: 'dashboard' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <StyledMenu pointing secondary vertical icon="labeled" size="tiny">
        <DashItem
          name="dashboard"
          active={activeItem === 'dashboard'}
          title="Dashboard"
          icon="dashboard"
          path="/"
          onClick={this.handleItemClick}
        />
        <DashItem
          name="entries"
          active={activeItem === 'entries'}
          title="Entries"
          icon="list layout"
          path="/entry"
          onClick={this.handleItemClick}
        />
        <DashItem
          name="settings"
          active={activeItem === 'settings'}
          title="Settings"
          icon="setting"
          path="/settings"
          onClick={this.handleItemClick}
        />
      </StyledMenu>
    );
  }
}
