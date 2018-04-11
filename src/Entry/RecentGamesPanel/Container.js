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

export class RecentGamesContainer extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames(this.props.summonerId);
  }

  render() {
    const {
      createEntryFromGameId,
      entries,
      fetchError,
      games,
      isLoadingEntries,
      showEntry,
      isFetchingRecentGames,
    } = this.props;

    if (isLoadingEntries || isFetchingRecentGames) {
      return <div>Loading recent games ...</div>;
    }
    const markedGames = markGamesWithExistingEntries(entries, games);

    return (
      <RecentGames
        createEntryFromGameId={(gameId) =>
            createEntryFromGameId(
              gameId,
              this.props.userId,
              this.props.summonerId,
            )
        }
        error={fetchError}
        games={markedGames}
        showEntry={showEntry}
      />
    );
  }
}

RecentGamesContainer.propTypes = {
  createEntryFromGameId: PropTypes.func.isRequired,
  entries: PropTypes.array,
  fetchError: PropTypes.string,
  isFetchingRecentGames: PropTypes.bool.isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoadingEntries: PropTypes.bool,
  showEntry: PropTypes.func.isRequired,
  summonerId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

RecentGamesContainer.defaultProps = {
  entries: [],
  fetchError: null,
  isLoadingEntries: false,
};

export default connect(
  ({ match: { error, games, fetchingRecentGames }, auth: { summonerId } }) => ({
    isFetchingRecentGames: fetchingRecentGames,
    fetchError: error,
    games: games.slice(0, 8),
    summonerId,
  }),
  (dispatch) => ({
    fetchRecentGames: (summonerId) => dispatch(fetchRecentGamesApi(summonerId)),
    createEntryFromGameId: (gameId, userId, summonerId) =>
      dispatch(createEntryFromGame(gameId, userId, summonerId)),
    showEntry: (entryId) => dispatch(push(`/entry/${entryId}`)),
  }),
)(RecentGamesContainer);
