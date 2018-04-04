import Rx from 'rxjs/Rx';
import { push } from 'react-router-redux';
import { createAction } from './helpers';
import { HARDCODED_USER_ID } from '../const';

const SIGN_IN = 'auth/SIGN_IN';
const SIGN_OUT = 'auth/SIGN_OUT';

// ----- ACTION CREATORS -------------------------------
// ----------------------------------------------------------
export const setAuth = createAction(SIGN_IN, 'userId', 'summoner', 'summonerId');
export const signOut = createAction(SIGN_OUT, 'userId', 'summoner');

// ------- REDUCER -----------------------------------------------
// ----------------------------------------------------------
const initialState = {
  userId: '',
  summoner: '',
  summonerId: '',
  isAuthenticated: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        userId: action.userId,
        summoner: action.summoner,
        summonerId: action.summonerId,
        isAuthenticated: true,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        userId: '',
        summoner: '',
        summonerId: '',
        isAuthenticated: false,
      };
    }

    default:
      return state;
  }
}
