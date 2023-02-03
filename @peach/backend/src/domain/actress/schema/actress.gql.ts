import { gql } from 'apollo-server';

export const actressTypeDefs = gql`
  type GeoLocation {
    longitude: Float!
    latitude: Float!
  }

  type ActressDates {
    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String
    age: Int
    inBusiness: Boolean
  }

  type ActressLocation {
    country: String
    province: String
    city: String
    location: GeoLocation
  }

  type ActressContact {
    socialMediaLinks: [String!]
    officialWebsite: String
  }

  type Actress {
    id: Int!
    name: String!
    picture: String
    aliases: [String!]!

    appearance: ActressAppearance
    dates: ActressDates
    location: ActressLocation
    contact: ActressContact

    movies: [Movie!]
  }

  extend type Query {
    actress(id: Int!): Actress
  }
`;
