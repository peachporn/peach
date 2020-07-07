import { gql } from 'apollo-boost';

export const updateActressMutation = gql`
  mutation UpdateActress($actressId: Int!, $data: ActressUpdateInput!) {
    updateActress(actressId: $actressId, data: $data) {
      id
    }
  }
`;
