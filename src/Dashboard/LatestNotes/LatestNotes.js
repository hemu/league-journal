import React from 'react';
import PropTypes from 'prop-types';

import DashboardItem from '../shared/DashboardItem';
import MarkableListWithMatchup from '../shared/MarkableListWithMatchup';

export const Notes = ({ notes, mainColor }) => (
  <DashboardItem title="Latest Notes" mainColor={mainColor}>
    <MarkableListWithMatchup notes={notes} withDate />
  </DashboardItem>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      entry: PropTypes.shape({
        champion: PropTypes.string,
        opponentChampion: PropTypes.string,
        gameDate: PropTypes.string,
      }),
      marked: PropTypes.bool,
      onMark: PropTypes.func.isRequired,
    }),
  ).isRequired,
  mainColor: PropTypes.string.isRequired,
};

export default Notes;
