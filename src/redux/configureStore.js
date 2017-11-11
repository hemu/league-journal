import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
// import { rootReducer, rootEpic } from ".";
import { rootReducer } from ".";

const loggerMiddleware = createLogger(); // initialize logger

// const epicMiddleware = createEpicMiddleware(rootEpic);

// const createStoreWithMiddleware = applyMiddleware(loggerMiddleware, client.middleware())(
//   createStore
// );
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
  createStore(
    rootReducer,
    {}, // initial state
    composeEnhancers(
      // applyMiddleware(loggerMiddleware, client.middleware(), epicMiddleware)
      applyMiddleware(loggerMiddleware)
    )
  );

export default configureStore;
