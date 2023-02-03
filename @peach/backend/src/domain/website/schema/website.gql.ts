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

  extend type Query {
    website(id: Int!): Website
  }
`;
