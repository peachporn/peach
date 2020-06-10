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
  }

  extend type Query {
    settings: Settings!
  }

  enum SettingsKey {
    language
    inferMovieTitle
  }

  extend type Mutation {
    updateLanguage(language: Language): Settings!
    updateInferMovieTitle(inferMovieTitle: InferMovieTitle): Settings!
    scanLibrary: Boolean
  }
`;
