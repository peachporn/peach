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
    screencapPath: String!
  }

  extend type Query {
    settings: Settings!
    pathExists(path: String!): Boolean
  }

  extend type Mutation {
    updateScreencapPath(screencapPath: String!): Settings!
    updateLanguage(language: Language): Settings!
    updateInferMovieTitle(inferMovieTitle: InferMovieTitle): Settings!
    scanLibrary: Boolean
    takeAllScreencaps: Boolean
  }
`;
