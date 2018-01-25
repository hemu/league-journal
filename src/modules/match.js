import { createAction } from './helpers';
import { recentGamesMock } from '../api/riot';

const FETCH_RECENT_GAMES = 'recentGames/FETCH_RECENT_GAMES';
const RECENT_GAMES_SUCCESS = 'recentGames/RECENT_GAMES_SUCCESS';

export const fetchRecentGames = createAction(FETCH_RECENT_GAMES, 'accountId');
export const recentGamesSuccess = createAction(RECENT_GAMES_SUCCESS, 'games');

export const fetchRecentGamesEpic = (action$) =>
  action$
    .ofType(FETCH_RECENT_GAMES)
    .mergeMap((action) =>
      recentGamesMock(action.accountId).then((games) =>
        recentGamesSuccess(games)));

const initialState = {
  recentGames: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECENT_GAMES_SUCCESS:
      return {
        ...state,
        recentGames: action.games,
      };
    default:
      return state;
  }
}
