/* @flow */

import { ApolloClient } from 'apollo-client';
// import { HttpLink } from "apollo-link-http";
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const SIMPLE_ENDPOINT =
  'https://api.graph.cool/simple/v1/cj9u0jd5w1gjg0174wsaj3k3w';

const client = new ApolloClient({
  link: new BatchHttpLink({ uri: SIMPLE_ENDPOINT }),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   networkInterface,
//   dataIdFromObject,
// });

export default client;
