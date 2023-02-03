import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: '' });

const operationNameUriLink = new ApolloLink((operation, forward) => {
  operation.setContext(() => ({
    uri: `${window.location.origin}/graphql?operation=${operation.operationName}`,
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(operationNameUriLink, httpLink),
});
