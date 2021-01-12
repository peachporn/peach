import { gql } from 'apollo-server';

export const settingsTypeDefs = gql`
  enum Language {
    EN
  }

  enum InferMovieTitle {
    FOLDER
    FILENAME
  }

  type Settings {
    language: Language!
    inferMovieTitle: InferMovieTitle!
    actressImagePath: String
    genreImagePath: String
    screencapPath: String
    volumes: [Volume!]!
  }

  extend type Query {
    settings: Settings!
  }
`;
