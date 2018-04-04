import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecentGames from './RecentGames';
import { createEntryFromGame } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames(this.props.summonerId);
  }

  render() {
    const { games, createEntryFromGameId } = this.props;
    return (
      <RecentGames
        games={games}
        createEntryFromGameId={(gameId) =>
          createEntryFromGameId(
            gameId,
            this.props.userId,
            this.props.summonerId,
          )
        }
      />
    );
  }
}

RecentGamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  summonerId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
};

export default connect(
  ({ match: { recentGames }, auth: { userId, summonerId } }) => ({
    games: recentGames.slice(0, 8),
    summonerId,
    userId,
  }),
  (dispatch) => ({
    fetchRecentGames: (summonerId) => dispatch(fetchRecentGamesApi(summonerId)),
    createEntryFromGameId: (gameId, userId, summonerId) =>
      dispatch(createEntryFromGame(gameId, userId, summonerId)),
  }),
)(RecentGamesContainer);
