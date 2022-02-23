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
    aliases: [String!]
    pictureUrl: String
  }

  type ActressScrapeResult {
    actress: ScrapedActress
    alternatives: [ScrapeAlternative!]!
  }

  extend type Query {
    scrapeActress(name: String!): ActressScrapeResult
  }
`;
