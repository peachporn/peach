import { gql } from 'apollo-server';

export const genresTypeDefs = gql`
  input GenreFilterInput {
    ids: [Int!]
    name: String
    fetish: Boolean
    minKinkiness: Int
    category: GenreCategory
  }

  type GenresResponse {
    genres: [Genre!]!
    total: Int!
  }

  extend type Query {
    genres(filter: GenreFilterInput, limit: Int, skip: Int): GenresResponse!
  }
`;
