import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Image } from 'semantic-ui-react';
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
    const { summonerId, regionId } = this.props;
    this.props.fetchRecentGames(summonerId, regionId);
  }

  render() {
    const {
      createEntryForUser,
      entries,
      fetchError,
      games,
      isLoadingEntries,
      showEntry,
      isFetchingRecentGames,
      userId,
      summonerId,
      regionId
    } = this.props;

    const isLoading = isLoadingEntries || isFetchingRecentGames;
    const markedGames = isLoading
      ? []
      : markGamesWithExistingEntries(entries, games);

    return (
      <RecentGames
        isLoading={isLoadingEntries || isFetchingRecentGames}
        createEntryFromGameId={(gameId) =>
          createEntryForUser(
            gameId,
            userId,
            summonerId,
            regionId,
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
  createEntryForUser: PropTypes.func.isRequired,
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
  ({
    match: { error, games, fetchingRecentGames },
    auth: { summonerId, regionId },
  }) => ({
    isFetchingRecentGames: fetchingRecentGames,
    fetchError: error,
    games,
    summonerId,
    regionId,
  }),
  (dispatch) => ({
    fetchRecentGames: (summonerId, regionId) =>
      dispatch(fetchRecentGamesApi(summonerId, regionId)),
    createEntryForUser: (gameId, userId, summonerId, regionId) =>
      dispatch(createEntryFromGame(gameId, userId, summonerId, regionId)),
    showEntry: (entryId) => dispatch(push(`/entry/${entryId}`)),
  }),
)(RecentGamesContainer);
