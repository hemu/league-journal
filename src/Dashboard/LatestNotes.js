import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DashboardItem from './shared/DashboardItem';
import MarkableList from './shared/MarkableList';

export const NotesMain = ({ notes, mainColor }) => (
  <DashboardItem title="Latest Notes" mainColor={mainColor}>
    <MarkableList items={notes} />
  </DashboardItem>
);

NotesMain.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(() => ({
  notes: ["Don't lose", 'Mistake 2', 'hallo'].map((item) => ({
    text: item,
  })),
}))(NotesMain);
