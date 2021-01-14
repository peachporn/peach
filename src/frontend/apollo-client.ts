import { ApolloClient, InMemoryCache } from '@apollo/client';

const host = window.location.origin || 'http://localhost:3000';

export const client = new ApolloClient({
  uri: `${host}/graphql`,
  cache: new InMemoryCache(),
});
