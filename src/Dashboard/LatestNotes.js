import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { sortBy } from 'lodash';
import { graphql, compose } from 'react-apollo';
import { latestNotesQuery } from '../api/notes';

import DashboardItem from './shared/DashboardItem';
import MarkableList from './shared/MarkableList';

function orderedNotes(mistakes, lessons) {
  const notes = [...mistakes, ...lessons];
  return sortBy(notes, (note) => new Date(note.createdAt)).slice(0, 10);
}

export const Notes = ({ data, mainColor }) => (
  <DashboardItem title="Latest Notes" mainColor={mainColor}>
    {data.loading ? (
      <div>Loading latest notes...</div>
    ) : (
      <MarkableList items={orderedNotes(data.allMistakes, data.allLessons)} />
    )}
  </DashboardItem>
);

Notes.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    allMistakes: PropTypes.array,
    allLessons: PropTypes.array,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default compose(graphql(latestNotesQuery), connect())(Notes);
