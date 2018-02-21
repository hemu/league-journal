import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecentGames from './RecentGames';
// import { createNewEntry } from '../../modules/entry';
import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';
import { HARDCODED_ACCOUNT_ID } from '../../const';

class RecentGamesContainer extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames(HARDCODED_ACCOUNT_ID);
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

RecentGamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  mainColor: PropTypes.string.isRequired,
  createEntry: PropTypes.func.isRequired,
};

export default connect(
  ({ match: { recentGames } }) => ({
    games: recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: () => dispatch(fetchRecentGamesApi()),
    createEntry: (entry) => {},
  }),
)(RecentGamesContainer);
