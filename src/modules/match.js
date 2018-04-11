import Rx from 'rxjs/Rx';
import { createAction } from './helpers';
import { getRecentGames } from '../api/riot';

const FETCH_RECENT_GAMES = 'recentGames/FETCH_RECENT_GAMES';
const RECENT_GAMES_SUCCESS = 'recentGames/RECENT_GAMES_SUCCESS';

export const fetchRecentGames = createAction(FETCH_RECENT_GAMES, 'accountId');
export const recentGamesSuccess = createAction(RECENT_GAMES_SUCCESS, 'results');

export const fetchRecentGamesEpic = (action$) =>
  action$
    .ofType(FETCH_RECENT_GAMES)
    .mergeMap((action) =>
      getRecentGames(action.accountId).then((results) =>
        recentGamesSuccess(results)));

const initialState = {
  error: null,
  games: [],
  fetchingRecentGames: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_RECENT_GAMES:
      return {
        ...state,
        fetchingRecentGames: true,
      };
    case RECENT_GAMES_SUCCESS:
      return {
        ...state,
        ...action.results,
        fetchingRecentGames: false,
      };
    default:
      return state;
  }
}
