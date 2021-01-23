import gql from 'graphql-tag';

export const createActressMutation = gql`
  mutation CreateActress($input: CreateActressInput!) {
    createActress(input: $input) {
      id
    }
  }
`;
