import { gql } from 'apollo-server';

export const websitesTypeDefs = gql`
  input WebsiteFilterInput {
    ids: [Int!]
    name: String
  }

  type WebsitesResponse {
    websites: [Website!]!
    total: Int!
  }

  extend type Query {
    websites(filter: WebsiteFilterInput, limit: Int, skip: Int): WebsitesResponse!
  }
`;
