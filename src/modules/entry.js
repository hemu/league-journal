import PropTypes from "prop-types";
import {
  fetchAllEntries as fetchAllEntriesApi,
  fetchDetailEntry as fetchDetailEntryApi,
  saveEntry as saveEntryApi
} from "../api/entry";
import { actions } from "react-redux-form";
import { RequestStatus } from "../const";
import { createAction } from "./helpers";
import { LOCAL_ID_PREFIX } from "../const";
import { entryFormInitialState } from "./entryForm";

export function isLocalEntry(entryId) {
  return entryId.startsWith(LOCAL_ID_PREFIX);
}

const FETCH_ALL_REQUEST = "entries/FETCH_ALL_REQUEST";
const FETCH_ALL_SUCCESS = "entries/FETCH_ALL_SUCCESS";
const FETCH_ALL_ERROR = "entries/FETCH_ALL_ERROR";

const FETCH_DETAIL_REQUEST = "entries/FETCH_DETAIL_REQUEST";
const FETCH_DETAIL_SUCCESS = "entries/FETCH_DETAIL_SUCCESS";
const FETCH_DETAIL_ERROR = "entries/FETCH_DETAIL_ERROR";

const SET_ENTRY_INDEX = "entries/SET_ENTRY_INDEX";
const SET_INIT_ENTRY_FIELDS = "entries/SET_INIT_ENTRY_FIELDS";

const SAVE_ENTRY = "entries/SAVE_ENTRY";
const SAVE_ENTRY_SUCCESS = "entries/SAVE_ENTRY_SUCCESS";
const ADD_ENTRY = "entries/ADD_ENTRY";

export const fetchAllEntries = createAction(FETCH_ALL_REQUEST);
export const fetchAllSuccess = createAction(FETCH_ALL_SUCCESS, "entries");
export const fetchDetailRequest = createAction(
  FETCH_DETAIL_REQUEST,
  "entryIndex",
  "entryId"
);
export const fetchDetailSuccess = createAction(FETCH_DETAIL_SUCCESS, "entry");
export const setEntryDetail = createAction(
  SET_ENTRY_INDEX,
  "entryIndex",
  "entryId"
);
export const saveEntry = createAction(SAVE_ENTRY, "entry");
export const saveEntrySuccess = createAction(SAVE_ENTRY_SUCCESS);
export const addEntry = createAction(ADD_ENTRY, "entry");

export const fetchAllEpic = action$ =>
  action$.ofType(FETCH_ALL_REQUEST).mergeMap(action =>
    fetchAllEntriesApi().then(result => {
      const { data: { allEntries } } = result;
      return fetchAllSuccess(allEntries);
    })
  );

export const initialEntryEpic = action$ =>
  action$
    .ofType(FETCH_ALL_SUCCESS)
    .mergeMap(action =>
      Promise.resolve(setEntryDetail(0, action.entries[0].id))
    );

export const setEntryDetailEpic = action$ =>
  action$
    .ofType(SET_ENTRY_INDEX)
    // .filter(action => !isLocalEntry(action.entryId))
    .map(action => fetchDetailRequest(action.entryIndex, action.entryId));

export const fetchEntryEpic = (action$, store) =>
  action$.ofType(FETCH_DETAIL_REQUEST).mergeMap(action => {
    const { entryIndex, entryId } = action;
    if (isLocalEntry(entryId)) {
      const { entry: { entries } } = store.getState();
      return Promise.resolve(fetchDetailSuccess(entries[entryIndex]));
    } else {
      return fetchDetailEntryApi(entryId).then(result => {
        const { data: { Entry: fetchedEntry } } = result;
        return fetchDetailSuccess(fetchedEntry);
      });
    }
  });

export const populateFormEpic = action$ =>
  action$
    .ofType(FETCH_DETAIL_SUCCESS)
    .map(action => actions.load("forms.entry", action.entry));

export const saveEntryEpic = action$ =>
  action$
    .ofType(SAVE_ENTRY)
    .mergeMap(action =>
      saveEntryApi(action.entry).then(() => saveEntrySuccess())
    );

const initialState = {
  entries: [],
  fetchAllStatus: RequestStatus.None,
  fetchEntryStatus: RequestStatus.None,
  entryIndex: 0
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return {
        ...state,
        fetchAllStatus: RequestStatus.Request
      };
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        entries: action.entries,
        fetchAllStatus: RequestStatus.Success
      };
    case SET_ENTRY_INDEX:
      return {
        ...state,
        entryIndex: action.entryIndex
      };
    case FETCH_DETAIL_REQUEST:
      return {
        ...state,
        fetchEntryStatus: RequestStatus.Request
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        entries: state.entries.map((entry, i) => {
          if (i === state.entryIndex) {
            return action.entry;
          }
          return entry;
        }),
        fetchEntryStatus: RequestStatus.Success
      };
    case ADD_ENTRY: {
      const newEntry = {
        ...entryFormInitialState,
        id: `${LOCAL_ID_PREFIX}_${state.entries.length}`,
        gameDate: new Date()
      };
      return {
        ...state,
        entries: [...state.entries, newEntry]
      };
    }

    default:
      return state;
  }
}

// const entriesLogic = kea({
//   actions: ({ constants }) => ({
//     fetchAllRequest: () => {},
//     fetchAllSuccess: result => result,
//     fetchAllError: error => error,
//     fetchDetailRequest: entryId => entryId,
//     fetchDetailSuccess: result => result,
//     fetchDetailError: error => error,
//     setEntryIndex: index => index
//   }),
//
//   thunks: ({ actions, get, fetch, dispatch, getState }) => ({
//     fetchEntries: async () => {
//       actions.fetchAllRequest();
//       const { data: { allEntries } } = await fetchAllEntries();
//       actions.fetchAllSuccess(allEntries);
//     },
//     fetchEntryDetail: async entryId => {
//       const results = await fetchDetailEntry(entryId);
//       const { data: { Entry: fetchedEntry } } = results;
//       actions.fetchDetailSuccess({
//         ...fetchedEntry,
//         gameDate: new Date(fetchedEntry.gameDate)
//       });
//     },
//     setEntryDetail: async entryIndex => {
//       const entriesState = fetch("entries").entries;
//       const entries = entriesState.entries;
//       if (entries && entryIndex < entries.length) {
//         actions.setEntryIndex(entryIndex);
//         const entry = entries[entryIndex];
//         const entryId = entry.id;
//         actions.fetchDetailRequest(entryId);
//         if (isLocalEntry(entryId)) {
//           actions.fetchDetailSuccess({
//             id: entryId,
//             gameDate: new Date()
//           });
//         } else {
//           actions.fetchEntryDetail(entryId);
//         }
//       }
//     }
//   }),
//   reducers: ({ actions, constants }) => ({
//     entries: [
//       {
//         entries: [],
//         fetchAllStatus: RequestStatus.None,
//         fetchDetailStatus: RequestStatus.None,
//         detailEntryId: "",
//         selectedEntryIndex: 0
//       },
//       PropTypes.object,
//       {
//         [actions.fetchAllRequest]: (state, payload) => {
//           return {
//             ...state,
//             fetchAllStatus: RequestStatus.Request
//           };
//         },
//         [actions.fetchAllSuccess]: (state, payload) => {
//           return {
//             ...state,
//             entries: payload,
//             fetchAllStatus: RequestStatus.Success
//           };
//         },
//         [actions.fetchDetailRequest]: (state, payload) => {
//           return {
//             ...state,
//             fetchDetailStatus: RequestStatus.Request,
//             detailEntryId: payload
//           };
//         },
//         [actions.fetchDetailSuccess]: (state, payload) => {
//           return {
//             ...state,
//             entries: state.entries.map(entry => {
//               if (entry.id === state.detailEntryId) {
//                 return payload;
//               }
//               return entry;
//             }),
//             fetchDetailStatus: RequestStatus.Success
//           };
//         },
//         [actions.setEntryIndex]: (state, payload) => {
//           return {
//             ...state,
//             selectedEntryIndex: payload
//           };
//         }
//       }
//     ]
//   })
// });

// export default entriesLogic;
