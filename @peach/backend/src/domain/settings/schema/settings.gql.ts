import { gql } from 'apollo-server';

export const settingsTypeDefs = gql`
  type Volume {
    name: String!
    path: String!
  }

  enum Language {
    EN
  }

  enum InferMovieTitle {
    FOLDER
    FILENAME
  }

  type Settings {
    id: Int!
    language: Language!
    inferMovieTitle: InferMovieTitle!
    libraryPath: String
    volumes: [Volume!]!
    pinnedFetishes: [Genre!]!
    autoConvertMovies: Boolean!
  }

  extend type Query {
    settings: Settings!
  }
`;
