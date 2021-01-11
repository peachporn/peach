import { gql } from 'apollo-server';

export const typeDef = gql`
  type MovieListMovie {
    id: Int!
    createdAt: String!
    title: String!
    url: String!
    fresh: Boolean!
    screencaps: [String!]!
    coverIndex: Int!
  }

  type Movie {
    id: Int!
    createdAt: String!
    title: String!
    url: String!
    actresses: [Actress!]!
    # website     Website
    metaData: MovieMetadata
    actors: Int!
    fresh: Boolean!

    volume: Volume
    screencaps: [String!]!
    coverIndex: Int!
    path: String!

    genres: [GenreDefinition!]!
    fetishes: [Genre!]!
  }

  type MovieMetadata {
    quality: Quality!
    format: Format!
    fps: Int!
    durationSeconds: Int!
    minutes: Int!
    seconds: Int!
    sizeInKB: Int!
    sizeInMB: Int!
  }

  enum Quality {
    SD
    HD
    FullHD
    UHD
  }

  enum Format {
    mp4
    wmv
  }

  input MovieUpdateInput {
    cover: Int
    title: String
  }

  input MoviesFilter {
    fetishes: [Int!]
  }

  type Query {
    movies(limit: Int, skip: Int, filter: MoviesFilter): [MovieListMovie!]!
    movieCount: Int!
    movie(id: Int!): Movie
    randomMovie: Movie!
  }

  extend type Mutation {
    updateMovie(movieId: Int!, data: MovieUpdateInput!): Movie

    addActressToMovie(movieId: Int!, actressId: Int!): Movie
    removeActressFromMovie(movieId: Int!, actressId: Int!): Movie

    setMovieFetishes(movieId: Int!, genreIds: [Int!]!): Movie

    deleteMovie(movieId: Int!): Movie
  }
`;
