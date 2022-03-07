import { gql } from 'apollo-server';

export const scrapeActressTypeDefs = gql`
  # Actress without id and required fields
  type ScrapedActress {
    name: String
    picture: String
    aliases: [String!]

    appearance: ActressAppearance
    dates: ActressDates
    location: ActressLocation
    contact: ActressContact
  }

  type ScrapeAlternative {
    name: String!
    detailUrl: String!
    aliases: [String!]
    pictureUrl: String
  }

  type ActressScrapeResult {
    actress: ScrapedActress
    alternatives: [ScrapeAlternative!]!
  }

  input ActressScrapeRequest {
    name: String
    detailUrl: String
  }

  extend type Query {
    scrapeActress(request: ActressScrapeRequest!): ActressScrapeResult
  }
`;
