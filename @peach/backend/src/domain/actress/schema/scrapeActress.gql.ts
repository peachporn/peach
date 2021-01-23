import { gql } from 'apollo-server';

export const scrapeActressTypeDefs = gql`
  type ActressScrapeResult {
    name: String!
    aliases: [String!]

    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    country: String
    province: String
    city: String
    location: GeoLocation

    boobs: Boobs

    piercings: String
    tattoos: String

    height: Int
    weight: Int
    measurements: Measurements
    cupsize: Cupsize

    socialMediaLinks: [String]
    officialWebsite: String

    picture: String
  }

  extend type Query {
    scrapeActress(name: String!): ActressScrapeResult
  }
`;
