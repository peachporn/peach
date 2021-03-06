import { ApolloClient } from '@apollo/client';
import { PathExistsQuery, PathExistsQueryVariables } from '@peach/types';
import { pathExistsQuery } from './queries/settings.gql';

export const validatePathExists = (client: ApolloClient<object>) => (value: string) =>
  client
    .query<PathExistsQuery, PathExistsQueryVariables>({
      query: pathExistsQuery,
      variables: {
        path: value,
      },
    })
    .then(result => result.data?.pathExists || false);
