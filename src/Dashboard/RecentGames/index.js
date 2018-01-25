import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecentGames from './RecentGames';

import { fetchRecentGames as fetchRecentGamesApi } from '../../modules/match';

class RecentGamesMain extends React.Component {
  componentWillMount() {
    this.props.fetchRecentGames();
  }

  render() {
    const { games, mainColor } = this.props;
    return games.length > 0 ? (
      <RecentGames games={games} mainColor={mainColor} />
    ) : (
      <div>No games found</div>
    );
  }
}

RecentGamesMain.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  mainColor: PropTypes.string.isRequired,
};

export default connect(
  ({ match }) => ({
    games: match.recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: () => dispatch(fetchRecentGamesApi()),
  }),
)(RecentGamesMain);
