import { gql } from 'apollo-server';

export const createWebsiteTypeDefs = gql`
  input CreateWebsiteInput {
    name: String!
    url: String!
    picture: String!
    fetish: Int
  }

  extend type Mutation {
    createWebsite(input: CreateWebsiteInput!): Website
  }
`;
