import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecentGames from './RecentGames';
import { createEntryFromGame } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';
import { fetchUser } from '../../api/user';
// import { HARDCODED_ACCOUNT_ID } from '../../const';

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    fetchUser().then((user) => {
      if (user != null) {
        this.props.fetchRecentGames(user.summonerId);
      }
    });
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
