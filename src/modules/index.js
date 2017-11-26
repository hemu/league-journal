import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import { combineForms } from "react-redux-form";
import { entryFormInitialState } from "./entryForm";

import entry, {
  fetchAllEpic,
  fetchEntryEpic,
  setEntryDetailEpic,
  initialEntryEpic,
  populateFormEpic
} from "./entry";

export const rootEpic = combineEpics(
  fetchAllEpic,
  fetchEntryEpic,
  setEntryDetailEpic,
  initialEntryEpic,
  populateFormEpic
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
