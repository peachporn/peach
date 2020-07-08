import { gql } from 'apollo-server';

export const typeDef = gql`
  type Scene {
    id: Int!
    timeStart: Int!
    timeEnd: Int!
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
    timeStart: Int!
    timeEnd: Int!
    genres: [GenreLinkInput!]!
  }

  extend type Mutation {
    addScene(movieId: Int!, scene: SceneInput!): Movie
  }
`;
