import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { entryFormInitialState } from './entryForm';

import entry, {
  populateFormEpic,
  saveEntryEpic,
  removeEntryEpic,
  updateMistakeEpic,
  updateLessonEpic,
  removeMistakeEpic,
  removeLessonEpic,
} from './entry';

export const rootEpic = combineEpics(
  populateFormEpic,
  saveEntryEpic,
  removeEntryEpic,
  updateMistakeEpic,
  updateLessonEpic,
  removeMistakeEpic,
  removeLessonEpic,
);

export const rootReducer = combineReducers({
  entry,
  forms: combineForms(
    {
      entry: entryFormInitialState,
    },
    'forms',
  ),
});
