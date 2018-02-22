import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecentGames from './RecentGames';
import { createEntryFromGame } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';
import { HARDCODED_ACCOUNT_ID } from '../../const';

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames(HARDCODED_ACCOUNT_ID);
  }

  render() {
    const { games, createEntryFromGameId } = this.props;
    return (
      <RecentGames
        games={games}
        createEntryFromGameId={createEntryFromGameId}
      />
    );
  }
}

RecentGamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
};

export default connect(
  ({ match: { recentGames } }) => ({
    games: recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: (accountId) => dispatch(fetchRecentGamesApi(accountId)),
    createEntryFromGameId: (gameId) => dispatch(createEntryFromGame(gameId)),
  }),
)(RecentGamesContainer);
