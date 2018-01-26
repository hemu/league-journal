import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { entryFormInitialState } from './entryForm';

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
);

export const rootReducer = combineReducers({
  entry,
  match,
  forms: combineForms(
    {
      entry: entryFormInitialState,
    },
    'forms',
  ),
  router: routerReducer,
});
