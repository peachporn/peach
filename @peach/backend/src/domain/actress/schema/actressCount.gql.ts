import { gql } from 'apollo-server';

export const actressCountTypeDefs = gql`
  extend type Query {
    actressCount(filter: ActressFilterInput): Int!
  }
`;
