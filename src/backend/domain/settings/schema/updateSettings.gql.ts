import { gql } from 'apollo-server';

export const updateSettingsTypeDefs = gql`
  input UpdateSettingsInput {
    language: Language
    inferMovieTitle: InferMovieTitle
    actressImagePath: String
    genreImagePath: String
    screencapPath: String
  }

  extend type Query {
    pathExists(path: String!): Boolean
  }

  extend type Mutation {
    updateSettings(data: UpdateSettingsInput!): Settings!
  }
`;
