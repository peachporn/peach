import { gql } from 'apollo-server';

export const genreDefinitionsTypeDef = gql`
  type GenreDefinition {
    id: Int!
    timeStart: Float!
    genre: GenreLink!
  }

  type GenreLink {
    parent: Genre!
    children: [Genre!]!
  }

  input GenreLinkInput {
    parent: Int!
    children: [Int!]!
  }

  input GenreDefinitionInput {
    timeStart: Float!
    genre: GenreLinkInput!
  }

  extend type Mutation {
    updateGenreDefinitions(movieId: Int!, genreDefinitions: [GenreDefinitionInput!]!): Movie
  }
`;
