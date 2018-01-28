import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import RecentGames from './RecentGames';
import { entryFormInitialState } from '../../modules/entryForm';
import { createNewEntry } from '../../modules/entry';
import { allEntriesQuery } from '../../api/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';
import { matchHistoryMock } from '../../api/matchHistory';

class Container extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames();
  }

  render() {
    const { games, mainColor, createEntry } = this.props;
    return games.length > 0 ? (
      <RecentGames
        games={games}
        mainColor={mainColor}
        createEntry={createEntry}
      />
    ) : (
      <div>No games found</div>
    );
  }
}

Container.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  mainColor: PropTypes.string.isRequired,
  createEntry: PropTypes.func.isRequired,
};

export default connect(
  ({ match }) => ({
    games: match.recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: () => dispatch(fetchRecentGamesApi()),
    createEntry: (entry) => dispatch(createNewEntry(entry)),
  }),
)(Container);
