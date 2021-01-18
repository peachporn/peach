import gql from 'graphql-tag';

export const updateActressMutation = gql`
  mutation UpdateActress($actressId: Int!, $data: ActressUpdateInput!) {
    updateActress(actressId: $actressId, data: $data) {
      id
    }
  }
`;
