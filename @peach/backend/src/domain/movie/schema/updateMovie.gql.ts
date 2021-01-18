import { gql } from 'apollo-server';

export const updateMovieTypeDefs = gql`
  input MovieUpdateInput {
    cover: Int
    title: String
  }

  extend type Mutation {
    updateMovie(movieId: Int!, data: MovieUpdateInput!): Movie

    addActressToMovie(movieId: Int!, actressId: Int!): Movie
    removeActressFromMovie(movieId: Int!, actressId: Int!): Movie

    setMovieFetishes(movieId: Int!, genreIds: [Int!]!): Movie
  }
`;
