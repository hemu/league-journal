import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecentGames from './RecentGames';
import { createEntryFromGame } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';
// import { HARDCODED_ACCOUNT_ID } from '../../const';

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    if (this.props.user != null) {
      this.props.fetchRecentGames(this.props.user.summonerId);
    }
  }

  render() {
    const { games, createEntryFromGameId, user } = this.props;
    return (
      <RecentGames
        games={games}
        createEntryFromGameId={(gameId) => createEntryFromGameId(gameId, user)}
      />
    );
  }
}

RecentGamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
  user: PropTypes.shape({
    summonerId: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default connect(
  ({ match: { recentGames } }) => ({
    games: recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: (accountId) => dispatch(fetchRecentGamesApi(accountId)),
    createEntryFromGameId: (gameId, user) =>
      dispatch(createEntryFromGame(gameId, user)),
  }),
)(RecentGamesContainer);
