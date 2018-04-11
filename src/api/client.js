/* @flow */

import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Message } from 'semantic-ui-react';
import { render } from 'react-dom';

// const SIMPLE_ENDPOINT =
//   'https://api.graph.cool/simple/v1/cj9u0jd5w1gjg0174wsaj3k3w';
const SIMPLE_ENDPOINT = 'http://localhost:4000/graphql';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  const messageRoot = document.getElementById('alert-cont');
  render(
    <Message
      error
      header="Can't connect to the internet."
      content="Any changes you make right now will be lost."
      onDismiss={() => render(<div />, messageRoot)}
    />,
    messageRoot,
  );
  // if (graphQLErrors) {
  //   graphQLErrors.map(({ message, locations, path }) => {

  //     console.log(
  //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //     );
  //   });
  // }
  // if (networkError) {
  //   render(
  //     <Message
  //       error
  //       content="There are connection issues. Your changes probably won't be saved."
  //       onDismiss={() => render(<div />, messageRoot)}
  //     />,
  //     messageRoot,
  //   );

  //   console.log(`[Network error]: ${networkError}`);
  // }
});

const httpLink = new BatchHttpLink({ uri: SIMPLE_ENDPOINT });
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ dataIdFromObject: (o) => o.id }),
});

export default client;
