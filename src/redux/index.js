import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import {
  combineForms,
  createForms // optional
} from "react-redux-form";

// import client from "~/api/client";
// ------ Reducers --------------
// import session from "./session";
// import userInput, { submitInputEpic } from "./userInput";

import { initialEntryState } from "./entry";

// ------ Epics --------------
// import ping, { pingEpic } from "./ping";

export const rootReducer = combineReducers({
  // session,
  // userInput,
  // ping
  // apollo: client.reducer()
  ...createForms({
    entry: initialEntryState
  })
});

// export const rootEpic = combineEpics(pingEpic, submitInputEpic);
