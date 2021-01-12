import { gql } from 'apollo-server';

export const createMovieTypeDefs = gql`
  input MovieLocation {
    volumeName: String!
    filePath: String!
  }

  input MovieFromFileInput {
    title: String!
    location: MovieLocation!
    actors: Int
  }

  type Mutation {
    createMovieFromFile(input: MovieFromFileInput!): Movie!
  }
`;
