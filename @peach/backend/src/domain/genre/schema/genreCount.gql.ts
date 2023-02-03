import { gql } from 'apollo-server';

export const genreCountTypeDefs = gql`
  extend type Query {
    genreCount(filter: GenreFilterInput): Int!
  }
`;
