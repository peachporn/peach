import { gql } from 'apollo-server';

export const updateActressTypeDefs = gql`
  input UpdateActressInput {
    name: String
    aliases: [String!]

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity

    country: String
    province: String
    city: String

    boobs: Boobs

    piercings: String
    tattoos: String

    height: Int
    weight: Int
    measurements: MeasurementsInput
    cupsize: Cupsize

    socialMediaLinks: [String]
    officialWebsite: String
  }

  input MeasurementsInput {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  extend type Mutation {
    updateActress(actressId: Int!, data: UpdateActressInput!): Actress
  }
`;
