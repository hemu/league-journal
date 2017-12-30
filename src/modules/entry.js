import PropTypes from 'prop-types';
import { actions, actionTypes } from 'react-redux-form';
import {
  fetchAllEntries as fetchAllEntriesApi,
  fetchDetailEntry as fetchDetailEntryApi,
  saveEntry as saveEntryApi,
  removeEntry as removeEntryApi,
  updateMistake as updateMistakeApi,
  updateLesson as updateLessonApi,
  removeMistake as removeMistakeApi,
  removeLesson as removeLessonApi,
} from '../api/entry';
import { RequestStatus, LOCAL_ID_PREFIX } from '../const';
import { createAction } from './helpers';
import { entryFormInitialState } from './entryForm';
import { isLocalEntry, isLocalId } from '../helpers';

const FETCH_ALL_REQUEST = 'entries/FETCH_ALL_REQUEST';
const FETCH_ALL_SUCCESS = 'entries/FETCH_ALL_SUCCESS';
const FETCH_ALL_ERROR = 'entries/FETCH_ALL_ERROR';

const FETCH_DETAIL_REQUEST = 'entries/FETCH_DETAIL_REQUEST';
const FETCH_DETAIL_SUCCESS = 'entries/FETCH_DETAIL_SUCCESS';
const FETCH_DETAIL_ERROR = 'entries/FETCH_DETAIL_ERROR';

const SET_ENTRY_INDEX = 'entries/SET_ENTRY_INDEX';
const SET_INIT_ENTRY_FIELDS = 'entries/SET_INIT_ENTRY_FIELDS';

const SAVE_ENTRY = 'entries/SAVE_ENTRY';
const SAVE_ENTRY_SUCCESS = 'entries/SAVE_ENTRY_SUCCESS';

const REMOVE_ENTRY = 'entries/REMOVE_ENTRY';
const REMOVE_ENTRY_SUCCESS = 'entries/REMOVE_ENTRY_SUCCESS';
const REMOVE_ENTRY_WITH_API_SUCCESS = 'entries/REMOVE_ENTRY_WITH_API_SUCCESS';

const UPDATE_MISTAKE = 'entries/UPDATE_MISTAKE';
const UPDATE_MISTAKE_SUCCESS = 'entries/UPDATE_MISTAKE_SUCCESS';

const REMOVE_MISTAKE = 'entries/REMOVE_MISTAKE';
const REMOVE_MISTAKE_SUCCESS = 'entries/REMOVE_MISTAKE_SUCCESS';

const UPDATE_LESSON = 'entries/UPDATE_LESSON';
const UPDATE_LESSON_SUCCESS = 'entries/UPDATE_LESSON_SUCCESS';

const REMOVE_LESSON = 'entries/REMOVE_LESSON';
const REMOVE_LESSON_SUCCESS = 'entries/REMOVE_LESSON_SUCCESS';

const DEBUG_ACTION = 'entries/DEBUG_ACTION';

const ADD_ENTRY = 'entries/ADD_ENTRY';

const SET_EDIT_MODE = 'entries/SET_EDIT_MODE';

// ----- ACTION CREATORS -------------------------------
// ----------------------------------------------------------
export const fetchAllEntries = createAction(FETCH_ALL_REQUEST);
export const fetchAllSuccess = createAction(FETCH_ALL_SUCCESS, 'entries');
export const fetchDetailRequest = createAction(
  FETCH_DETAIL_REQUEST,
  'entryIndex',
  'entryId',
);
export const fetchDetailSuccess = createAction(FETCH_DETAIL_SUCCESS, 'entry');
export const setEntryDetail = createAction(
  SET_ENTRY_INDEX,
  'entryIndex',
  'entryId',
);
export const saveEntry = createAction(SAVE_ENTRY, 'entry');
export const saveEntrySuccess = createAction(SAVE_ENTRY_SUCCESS);

export const removeEntry = createAction(
  REMOVE_ENTRY,
  'entryId',
  'mistakes',
  'lessons',
);
export const removeEntrySuccess = createAction(REMOVE_ENTRY_SUCCESS);
const removeEntryWithApiSuccess = createAction(REMOVE_ENTRY_WITH_API_SUCCESS);

export const updateMistake = createAction(UPDATE_MISTAKE, 'id', 'text');
const updateMistakeSuccess = createAction(UPDATE_MISTAKE_SUCCESS);

export const removeMistake = createAction(REMOVE_MISTAKE, 'id');
const removeMistakeSuccess = createAction(REMOVE_MISTAKE_SUCCESS);

export const updateLesson = createAction(UPDATE_LESSON, 'id', 'text');
const updateLessonSuccess = createAction(UPDATE_LESSON_SUCCESS);

export const removeLesson = createAction(REMOVE_LESSON, 'id');
const removeLessonSuccess = createAction(REMOVE_LESSON_SUCCESS);

const debugAction = createAction(DEBUG_ACTION, 'msg');

export const addEntry = createAction(ADD_ENTRY, 'entry');

export const setEditMode = createAction(SET_EDIT_MODE, 'editMode');

// ----- EPICS ----------------------------------------------
// ----------------------------------------------------------
export const fetchAllEpic = action$ =>
  action$.ofType(FETCH_ALL_REQUEST).mergeMap(action =>
    fetchAllEntriesApi().then((result) => {
      const { data: { allEntries } } = result;
      return fetchAllSuccess(allEntries);
    }));

export const initialEntryEpic = action$ =>
  action$
    .ofType(FETCH_ALL_SUCCESS)
    .mergeMap(action =>
      Promise.resolve(setEntryDetail(0, action.entries[0].id)));

export const setEntryDetailEpic = action$ =>
  action$
    .ofType(SET_ENTRY_INDEX)
    .map(action => fetchDetailRequest(action.entryIndex, action.entryId));

export const fetchEntryEpic = (action$, store) =>
  action$.ofType(FETCH_DETAIL_REQUEST).mergeMap((action) => {
    const { entryIndex, entryId } = action;
    if (isLocalEntry(entryId)) {
      const { entry: { entries } } = store.getState();
      return Promise.resolve(fetchDetailSuccess(entries[entryIndex]));
    }
    return fetchDetailEntryApi(entryId).then((result) => {
      const { data: { Entry: fetchedEntry } } = result;
      return fetchDetailSuccess(fetchedEntry);
    });
  });

export const populateFormEpic = action$ =>
  action$
    .ofType(FETCH_DETAIL_SUCCESS)
    .map(action => actions.load('forms.entry', action.entry));

export const saveEntryEpic = action$ =>
  action$
    .ofType(SAVE_ENTRY)
    .mergeMap(action =>
      saveEntryApi(action.entry).then(() => saveEntrySuccess()));

export const removeEntryEpic = action$ =>
  action$.ofType(REMOVE_ENTRY).mergeMap((action) => {
    const { entryId, mistakes, lessons } = action;
    if (isLocalEntry(entryId)) {
      return Promise.resolve(removeEntrySuccess());
    }
    return removeEntryApi(entryId, mistakes, lessons).then(() =>
      removeEntryWithApiSuccess());
  });

export const removeEntrySuccessEpic = (action$, store) =>
  action$
    .ofType(REMOVE_ENTRY_SUCCESS)
    .map(action => setEntryDetail(0, store.getState().entry.entries[0].id));

export const entryListUpdateEpic = action$ =>
  action$
    .ofType(REMOVE_ENTRY_WITH_API_SUCCESS, SAVE_ENTRY_SUCCESS)
    .mapTo(fetchAllEntries());

export const updateMistakeEpic = action$ =>
  action$
    .filter(action => action.type === UPDATE_MISTAKE && !isLocalId(action.id))
    .mergeMap(action =>
      updateMistakeApi(action.id, action.text).then(() =>
        updateMistakeSuccess()));

export const removeMistakeEpic = action$ =>
  action$
    .ofType(REMOVE_MISTAKE)
    .mergeMap(action =>
      removeMistakeApi(action.id).then(() => removeMistakeSuccess()));

export const updateLessonEpic = action$ =>
  action$
    .filter(action => action.type === UPDATE_LESSON && !isLocalId(action.id))
    .mergeMap(action =>
      updateLessonApi(action.id, action.text).then(() => updateLessonSuccess()));

export const removeLessonEpic = action$ =>
  action$
    .ofType(REMOVE_LESSON)
    .mergeMap(action =>
      removeLessonApi(action.id).then(() => removeLessonSuccess()));

// ------- REDUCER -----------------------------------------------
// ----------------------------------------------------------

const initialState = {
  entries: [],
  fetchAllStatus: RequestStatus.None,
  fetchEntryStatus: RequestStatus.None,
  entryIndex: 0,
  editMode: false,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return {
        ...state,
        fetchAllStatus: RequestStatus.Request,
      };
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        entries: action.entries,
        fetchAllStatus: RequestStatus.Success,
      };
    case SET_ENTRY_INDEX:
      return {
        ...state,
        entryIndex: action.entryIndex,
      };
    case FETCH_DETAIL_REQUEST:
      return {
        ...state,
        fetchEntryStatus: RequestStatus.Request,
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
        fetchEntryStatus: RequestStatus.Success,
      };
    case ADD_ENTRY: {
      const newEntry = {
        ...entryFormInitialState,
        id: `${LOCAL_ID_PREFIX}_${state.entries.length}`,
        gameDate: new Date(),
      };
      return {
        ...state,
        entries: [...state.entries, newEntry],
      };
    }

    case REMOVE_ENTRY: {
      if (isLocalEntry(action.entryId)) {
        return {
          ...state,
          entries: state.entries.filter(({ id }) => id != action.entryId),
        };
      }
      return state;
    }

    case SET_EDIT_MODE: {
      return {
        ...state,
        editMode: action.editMode,
      };
    }

    default:
      return state;
  }
}
