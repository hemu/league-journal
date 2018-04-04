import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { rootEpic, rootReducer } from '../modules';

const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const routerHistory = createHistory();

let store = null;

export default function getStore() {
  if (store == null) {
    store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(epicMiddleware, thunk, routerMiddleware(routerHistory)),
      ),
    );
  }
  return store;
}
