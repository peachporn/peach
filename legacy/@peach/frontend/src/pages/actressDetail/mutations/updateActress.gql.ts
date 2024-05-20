import gql from 'graphql-tag';

export const updateActressMutation = gql`
  mutation UpdateActress($actressId: Int!, $data: UpdateActressInput!) {
    updateActress(actressId: $actressId, data: $data) {
      id
    }
  }
`;
