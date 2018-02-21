import { actions } from 'react-redux-form';
import Rx from 'rxjs/Rx';
import { push } from 'react-router-redux';
import { sortBy, groupBy } from 'lodash';
import client from '../api/client';
import {
  entryByIdQuery,
  entriesByUserQuery,
  saveEntry as saveEntryApi,
  removeEntry as removeEntryApi,
  updateMistake as updateMistakeApi,
  updateLesson as updateLessonApi,
  removeMistake as removeMistakeApi,
  removeLesson as removeLessonApi,
  // createNewEntry as createNewEntryApi,
} from '../api/entry';
import { notesQuery } from '../api/note';
import { getMatchDetails } from '../api/riot';
import { createAction } from './helpers';
import { isLocalEntry, isLocalId } from '../helpers';

const SET_ENTRY_DETAIL_ID = 'entries/SET_ENTRY_DETAIL_ID';

const SAVE_ENTRY = 'entries/SAVE_ENTRY';
const SAVE_ENTRY_SUCCESS = 'entries/SAVE_ENTRY_SUCCESS';

// const CREATE_ENTRY = 'entries/CREATE_ENTRY';
const CREATE_ENTRY_SUCCESS = 'entries/CREATE_ENTRY_SUCCESS';

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

const FETCH_NOTES = 'entries/FETCH_NOTES';

// const DEBUG_ACTION = 'entries/DEBUG_ACTION';

const SET_EDIT_MODE = 'entries/SET_EDIT_MODE';

// ----- ACTION CREATORS -------------------------------
// ----------------------------------------------------------
export const setEntryDetailId = createAction(SET_ENTRY_DETAIL_ID, 'entryId');
export const saveEntry = createAction(SAVE_ENTRY, 'entry');
export const saveEntrySuccess = createAction(SAVE_ENTRY_SUCCESS);

// export const createNewEntry = createAction(CREATE_ENTRY, 'entry');
export const createNewEntrySuccess = createAction(
  CREATE_ENTRY_SUCCESS,
  'entry',
);

export const removeEntry = createAction(
  REMOVE_ENTRY,
  'entryId',
  'mistakes',
  'lessons',
);
export const removeEntrySuccess = createAction(REMOVE_ENTRY_SUCCESS);
// const removeEntryWithApiSuccess = createAction(REMOVE_ENTRY_WITH_API_SUCCESS);

export const updateMistake = createAction(UPDATE_MISTAKE, 'id', 'text');
const updateMistakeSuccess = createAction(UPDATE_MISTAKE_SUCCESS);

export const removeMistake = createAction(REMOVE_MISTAKE, 'id');
const removeMistakeSuccess = createAction(REMOVE_MISTAKE_SUCCESS);

export const updateLesson = createAction(UPDATE_LESSON, 'id', 'text');
const updateLessonSuccess = createAction(UPDATE_LESSON_SUCCESS);

export const removeLesson = createAction(REMOVE_LESSON, 'id');
const removeLessonSuccess = createAction(REMOVE_LESSON_SUCCESS);

// const debugAction = createAction(DEBUG_ACTION, 'msg');
export const fetchNotes = createAction(FETCH_NOTES, 'entryId');

export const setEditMode = createAction(
  SET_EDIT_MODE,
  'editMode',
  'entryId',
  'fromLocation',
);

// ----- EPICS ----------------------------------------------
// ----------------------------------------------------------
// const newPath = ownProps.history.location.pathname
//   .split('/')
//   .slice(0, -1)
//   .join('/');
// ownProps.history.push(`${newPath}`);
export const entryEditOffEpic = (action$) =>
  action$
    .filter((action) => action.type === SET_EDIT_MODE && !action.editMode)
    .map((action) => {
      const newPath = action.fromLocation
        .split('/')
        .slice(0, -1)
        .join('/');
      return push(newPath);
    });

export const entryEditOnEpic = (action$) =>
  action$
    .filter((action) => action.type === SET_EDIT_MODE && action.editMode)
    .mergeMap((action) => {
      const data = client.readQuery({
        query: entryByIdQuery,
        variables: {
          id: action.entryId,
        },
      });
      const entry = data.entryById;
      // entry.deathReasons = entry.deathReasons.map((text) => ({
      //   text,
      // }));
      // entry.csReasons = entry.csReasons.map((text) => ({
      //   text,
      // }));
      // entry.positives = entry.positives.map((text) => ({
      //   text,
      // }));
      return Rx.Observable.concat(
        Rx.Observable.of(actions.load('forms.entry', entry)),
        Rx.Observable.of(push(`${action.fromLocation}/edit`)),
      );
    });

// export const createEntryEpic = (action$) =>
//   action$.ofType(CREATE_ENTRY).mergeMap((action) =>
//     getMatchDetails(action.entry.gameId)
//       .then((details) =>
//         createNewEntryApi({
//           ...action.entry,
//           ...details,
//         }))
//       .then((success) => push(`/entry/${success.data.createEntry.id}`)));

export const saveEntryEpic = (action$) =>
  action$
    .ofType(SAVE_ENTRY)
    .mergeMap((action) =>
      saveEntryApi(action.entry).then(() => saveEntrySuccess()));

export const removeEntryEpic = (action$) =>
  action$.ofType(REMOVE_ENTRY).mergeMap((action) => {
    const { entryId, mistakes, lessons } = action;
    return removeEntryApi(entryId, mistakes, lessons).then(() =>
      setEntryDetailId(''));
  });

export const updateMistakeEpic = (action$) =>
  action$
    .filter((action) => action.type === UPDATE_MISTAKE && !isLocalId(action.id))
    .mergeMap((action) =>
      updateMistakeApi(action.id, action.text).then(() =>
        updateMistakeSuccess()));

export const removeMistakeEpic = (action$) =>
  action$
    .ofType(REMOVE_MISTAKE)
    .mergeMap((action) =>
      removeMistakeApi(action.id).then(() => removeMistakeSuccess()));

export const updateLessonEpic = (action$) =>
  action$
    .filter((action) => action.type === UPDATE_LESSON && !isLocalId(action.id))
    .mergeMap((act) =>
      updateLessonApi(act.id, act.text).then(() => updateLessonSuccess()));

export const removeLessonEpic = (action$) =>
  action$
    .ofType(REMOVE_LESSON)
    .mergeMap((action) =>
      removeLessonApi(action.id).then(() => removeLessonSuccess()));

export const setEntryDetailEpic = (action$) =>
  action$.ofType(SET_ENTRY_DETAIL_ID).mergeMap((action) => {
    let { entryId } = action;
    if (!entryId) {
      const data = client.readQuery({
        query: entriesByUserQuery,
      });
      if (data.entriesByUser.length > 0) {
        entryId = data.entriesByUser[0].id;
      }
    }
    return Rx.Observable.of(push(`/entry/${entryId}`));
  });

export const fetchNotesEpic = (action$) =>
  action$.ofType(FETCH_NOTES).mergeMap((action) => {
    const data = client.readQuery({
      query: notesQuery,
      variables: {
        entry: action.entryId,
      },
    });
    return Rx.Observable.of(
      actions.load(
        'forms.entryNote',
        groupBy(sortBy(data.notesByEntry, 'createdAt'), 'type'),
      ),
    );
  });

// ------- REDUCER -----------------------------------------------
// ----------------------------------------------------------

const initialState = {
  // entryDetailId: '',
  editMode: false,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case SET_ENTRY_DETAIL_ID:
    //   return {
    //     ...state,
    //     entryDetailId: action.entryId,
    //   };
    case REMOVE_ENTRY: {
      if (isLocalEntry(action.entryId)) {
        return {
          ...state,
          entries: state.entries.filter(({ id }) => id !== action.entryId),
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
