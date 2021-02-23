import { gql } from 'apollo-server';

export const createActressTypeDefs = gql`
  input MesaurementsInput {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  input CreateActressInput {
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

  extend type Mutation {
    createActress(input: CreateActressInput!): Actress
  }
`;
