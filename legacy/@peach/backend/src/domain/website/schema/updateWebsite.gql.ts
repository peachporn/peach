import { gql } from 'apollo-server';

export const updateWebsiteTypeDefs = gql`
  input UpdateWebsiteInput {
    name: String
    url: String
    fetish: Int
  }

  extend type Mutation {
    updateWebsite(websiteId: Int!, data: UpdateWebsiteInput!): Website
  }
`;
