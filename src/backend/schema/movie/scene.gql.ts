import { gql } from 'apollo-server';

export const typeDef = gql`
  type Scene {
    id: Int!
    timeStart: Float!
    timeEnd: Float!
    genres: [GenreLink!]!
  }

  type GenreLink {
    parent: Genre!
    children: [Genre!]!
  }

  input GenreLinkInput {
    parent: Int!
    children: [Int!]!
  }

  input SceneInput {
    timeStart: Float!
    timeEnd: Float!
    genres: [GenreLinkInput!]!
  }

  extend type Mutation {
    updateScenes(movieId: Int!, scenes: [SceneInput!]!): Movie
  }
`;
