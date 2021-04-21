import { gql } from 'apollo-server';

export const extractMovieInformationTypeDefs = gql`
  type Token {
    token: String!
    detection: Int
  }
  union Detection = WebsiteDetection | ActressDetection

  type WebsiteDetection {
    id: Int!
    content: Website!
  }

  type ActressDetection {
    id: Int!
    content: Actress!
  }

  type ExtractedMovieInformation {
    tokens: [Token!]!
    detections: [Detection!]!
  }

  extend type Mutation {
    extractMovieInformation(movieTitle: String!): ExtractedMovieInformation!
  }
`;
