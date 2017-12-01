import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import { combineForms } from "react-redux-form";
import { entryFormInitialState } from "./entryForm";

import entry, {
  fetchAllEpic,
  fetchEntryEpic,
  setEntryDetailEpic,
  initialEntryEpic,
  populateFormEpic,
  saveEntryEpic,
  removeEntryEpic,
  removeEntrySuccessEpic,
  entryListUpdateEpic
} from "./entry";

export const rootEpic = combineEpics(
  fetchAllEpic,
  fetchEntryEpic,
  setEntryDetailEpic,
  initialEntryEpic,
  populateFormEpic,
  saveEntryEpic,
  removeEntryEpic,
  removeEntrySuccessEpic,
  entryListUpdateEpic
);

export const rootReducer = combineReducers({
  entry,
  forms: combineForms(
    {
      entry: entryFormInitialState
    },
    "forms"
  )
  // ...createForms({
  //   entryDetail: entryFormInitialState
  // })
});
