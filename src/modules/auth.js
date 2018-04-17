import { createAction } from './helpers';

const SIGN_IN = 'auth/SIGN_IN';
const SIGN_OUT = 'auth/SIGN_OUT';

// ----- ACTION CREATORS -------------------------------
// ----------------------------------------------------------
export const setAuth = createAction(
  SIGN_IN,
  'userId',
  'summoner',
  'summonerId',
  'regionId',
);
export const signOut = createAction(SIGN_OUT);

// ------- REDUCER -----------------------------------------------
// ----------------------------------------------------------
const initialState = {
  userId: '',
  summoner: '',
  summonerId: '',
  regionId: '',
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
        regionId: action.regionId,
        isAuthenticated: true,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        userId: '',
        summoner: '',
        summonerId: '',
        regionId: '',
        isAuthenticated: false,
      };
    }

    default:
      return state;
  }
}
