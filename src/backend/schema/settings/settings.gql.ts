import { gql } from 'apollo-server';

export const typeDef = gql`
  enum Language {
    EN
  }

  enum InferMovieTitle {
    FOLDER
    FILENAME
  }

  type Settings {
    language: Language!
    volumes: [Volume!]!
    inferMovieTitle: InferMovieTitle!
    actressImagePath: String
    genreImagePath: String
    screencapPath: String
  }

  input UpdateSettingsInput {
    language: Language
    inferMovieTitle: InferMovieTitle
    actressImagePath: String
    genreImagePath: String
    screencapPath: String
  }

  extend type Query {
    settings: Settings!
    pathExists(path: String!): Boolean
  }

  extend type Mutation {
    updateSettings(data: UpdateSettingsInput!): Settings!
    scanLibrary: Boolean
    takeAllScreencaps: Boolean
  }
`;
