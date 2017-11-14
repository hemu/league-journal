import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
// import { ApolloProvider } from "react-apollo";
import client from "./api/client";
import "semantic-ui-css/semantic.min.css";

import store from "./store";

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
