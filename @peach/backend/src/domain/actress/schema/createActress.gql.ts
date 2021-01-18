import { gql } from 'apollo-server';

export const createActressTypeDefs = gql`
  input ActressCreateInput {
    name: String!
  }

  extend type Mutation {
    createActress(actress: ActressCreateInput!): Actress
    scrapeActress(id: Int!): Boolean
  }
`;
