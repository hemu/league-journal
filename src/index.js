import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { ApolloProvider } from "react-apollo";

import configureStore from "./redux/configureStore";
import client from "./api/client";

// const SIMPLE_ENDPOINT =
//   "https://api.graph.cool/simple/v1/cj9u0jd5w1gjg0174wsaj3k3w";
//
// const httpLink = new HttpLink({ uri: SIMPLE_ENDPOINT });
//
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

const store = new configureStore();

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
