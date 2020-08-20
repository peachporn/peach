import { gql } from 'apollo-server';

export const typeDef = gql`
  type GenreDefinition {
    id: Int!
    timeStart: Float!
    timeEnd: Float!
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
    timeEnd: Float!
    genre: GenreLinkInput!
  }

  extend type Mutation {
    updateGenreDefinitions(movieId: Int!, genreDefinitions: [GenreDefinitionInput!]!): Movie
  }
`;
