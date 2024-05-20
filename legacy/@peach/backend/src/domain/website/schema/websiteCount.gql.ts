import { gql } from 'apollo-server';

export const websiteCountTypeDefs = gql`
  extend type Query {
    websiteCount(filter: WebsiteFilterInput): Int!
  }
`;
