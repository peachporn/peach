import ApolloClient from 'apollo-boost';

const host = window.location.origin || 'http://localhost:3000';

export const client = new ApolloClient({
  uri: `${host}/graphql`,
});
