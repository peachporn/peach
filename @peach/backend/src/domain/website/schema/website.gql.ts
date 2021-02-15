import { gql } from 'apollo-server';

export const websiteTypeDefs = gql`
  type Website {
    id: Int!
    name: String!
    picture: String
    url: String!
    fetish: Genre

    movies: [Movie!]!
  }

  input WebsiteFilter {
    name: String
  }

  extend type Query {
    website(id: Int!): Website
    websites(filter: WebsiteFilter, limit: Int, skip: Int): [Website!]!
    websitesCount(filter: WebsiteFilter): Int!
  }
`;
