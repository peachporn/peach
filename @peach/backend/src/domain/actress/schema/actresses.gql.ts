import { gql } from 'apollo-server';

export const actressesTypeDefs = gql`
  input ActressFilterInput {
    ids: [Int!]
    name: String
  }

  type ActressesResponse {
    actresses: [Actress!]!
    total: Int!
  }

  extend type Query {
    actresses(filter: ActressFilterInput, limit: Int, skip: Int): ActressesResponse!
  }
`;
