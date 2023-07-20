import { gql } from 'apollo-server';

export const updateSettingsTypeDefs = gql`
  input VolumeInput {
    name: String!
    path: String!
  }

  input UpdateSettingsInput {
    language: Language
    inferMovieTitle: InferMovieTitle
    libraryPath: String
    volumes: [VolumeInput!]!
    autoConvertMovies: Boolean
  }

  extend type Query {
    pathExists(path: String!): Boolean
  }

  extend type Mutation {
    updateSettings(data: UpdateSettingsInput!): Settings!
  }
`;
