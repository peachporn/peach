import { gql } from 'apollo-server';

export const createActressTypeDefs = gql`
  input CreateActressInput {
    name: String!
    aliases: [String!]

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    haircolor: Haircolor
    eyecolor: Eyecolor

    country: String
    province: String
    city: String

    equipment: [EquipmentInput!]!
    genderExpression: GenderExpression!

    piercings: String
    tattoos: String

    height: Int
    weight: Int
    measurements: MeasurementsInput

    socialMediaLinks: [String!]
    officialWebsite: String
  }

  extend type Mutation {
    createActress(input: CreateActressInput!): Actress
  }
`;
