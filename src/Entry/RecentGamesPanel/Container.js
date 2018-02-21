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
    const { games, createEntry } = this.props;
    return <RecentGames games={games} createEntry={createEntry} />;
  }
}

RecentGamesContainer.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRecentGames: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
};

export default connect(
  ({ match: { recentGames } }) => ({
    games: recentGames.slice(0, 8),
  }),
  (dispatch) => ({
    fetchRecentGames: (accountId) => dispatch(fetchRecentGamesApi(accountId)),
    createEntry: (entry) => {},
  }),
)(RecentGamesContainer);
