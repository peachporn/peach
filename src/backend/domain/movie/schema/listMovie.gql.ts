import { gql } from 'apollo-server';

export const listMovieTypeDefs = gql`
  type MovieListMovie {
    id: Int!
    createdAt: String!
    title: String!
    url: String!
    fresh: Boolean!
    screencaps: [String!]!
    coverIndex: Int!
  }

  input MoviesFilter {
    fetishes: [Int!]
  }

  type Query {
    movies(limit: Int, skip: Int, filter: MoviesFilter): [MovieListMovie!]!
    movieCount: Int!
  }
`;
