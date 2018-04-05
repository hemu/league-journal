import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RecentGames from './RecentGames';
import { createEntryFromGame } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';

function markGamesWithExistingEntries(entries, games) {
  return games.map((game) => {
    for (const entry of entries) {
      if (entry.gameId === game.gameId.toString()) {
        return {
          ...game,
          entryId: entry.id,
        };
      }
    }
    return game;
  });
}

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames(this.props.summonerId);
  }

  render() {
    const {
      games,
      createEntryFromGameId,
      isLoadingEntries,
      entries,
      showEntry,
    } = this.props;

    if (!entries || isLoadingEntries) {
      return <div>Loading recent games ...</div>;
    }
    const markedGames = markGamesWithExistingEntries(entries, games);

    return (
      <RecentGames
        games={markedGames}
        createEntryFromGameId={(gameId) =>
          createEntryFromGameId(
            gameId,
            this.props.userId,
            this.props.summonerId,
          )
        }
        showEntry={showEntry}
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
  showEntry: PropTypes.func.isRequired,
  isLoadingEntries: PropTypes.bool,
  entries: PropTypes.array,
};

export default connect(
  ({ match: { recentGames }, auth: { summonerId } }) => ({
    games: recentGames.slice(0, 8),
    summonerId,
  }),
  (dispatch) => ({
    fetchRecentGames: (summonerId) => dispatch(fetchRecentGamesApi(summonerId)),
    createEntryFromGameId: (gameId, userId, summonerId) =>
      dispatch(createEntryFromGame(gameId, userId, summonerId)),
    showEntry: (entryId) => dispatch(push(`/entry/${entryId}`)),
  }),
)(RecentGamesContainer);
