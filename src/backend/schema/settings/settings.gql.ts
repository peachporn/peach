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
    screencapPath: String
  }

  extend type Query {
    settings: Settings!
    pathExists(path: String!): Boolean
  }

  extend type Mutation {
    updateActressImagePath(path: String!): Settings!
    updateScreencapPath(path: String!): Settings!
    updateLanguage(language: Language): Settings!
    updateInferMovieTitle(inferMovieTitle: InferMovieTitle): Settings!
    scanLibrary: Boolean
    takeAllScreencaps: Boolean
  }
`;
