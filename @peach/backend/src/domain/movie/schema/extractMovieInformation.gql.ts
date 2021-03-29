import { gql } from 'apollo-server';

export const extractMovieInformationTypeDefs = gql`
  type ExtractedMovieInformation {
    actresses: [Actress!]!
    website: Website
  }

  extend type Mutation {
    extractMovieInformation(movieTitle: String!): ExtractedMovieInformation!
  }
`;
