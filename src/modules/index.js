import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { entryFormInitialState } from './entryForm';
import { signinFormInitialState, signupFormInitialState } from './authForm';
import { entryNoteFormInitialState } from './entryNoteForm';

import match, { fetchRecentGamesEpic } from './match';

import entry, {
  entryEditOnEpic,
  entryEditOffEpic,
  saveEntryEpic,
  removeEntryEpic,
  updateMistakeEpic,
  updateLessonEpic,
  removeMistakeEpic,
  removeLessonEpic,
  setEntryDetailEpic,
  createEntryFromGameEpic,
  fetchNotesEpic,
} from './entry';

export const rootEpic = combineEpics(
  entryEditOnEpic,
  entryEditOffEpic,
  saveEntryEpic,
  removeEntryEpic,
  updateMistakeEpic,
  updateLessonEpic,
  removeMistakeEpic,
  removeLessonEpic,
  fetchRecentGamesEpic,
  setEntryDetailEpic,
  createEntryFromGameEpic,
  fetchNotesEpic,
);

export const rootReducer = combineReducers({
  entry,
  match,
  forms: combineForms(
    {
      entry: entryFormInitialState,
      signup: signupFormInitialState,
      signin: signinFormInitialState,
      entryNote: entryNoteFormInitialState,
    },
    'forms',
  ),
  router: routerReducer,
});
