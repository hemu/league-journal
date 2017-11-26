import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import configureStore from "./store/reduxStore";
import registerServiceWorker from "./registerServiceWorker";
import client from "./api/client";
import "rxjs";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
