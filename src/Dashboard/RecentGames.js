import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DashboardItem from './shared/DashboardItem';
import MarkableList from './shared/MarkableList';

export const RecentGamesMain = ({ games, mainColor }) => (
  <DashboardItem title="Recent Games" mainColor={mainColor}>
    <MarkableList items={games} />
  </DashboardItem>
);

RecentGamesMain.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(() => ({
  games: ["Don't lose", 'Mistake 2', 'hallo'].map((item) => ({
    text: item,
  })),
}))(RecentGamesMain);
