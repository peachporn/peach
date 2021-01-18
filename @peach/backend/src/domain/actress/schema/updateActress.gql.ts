import { gql } from 'apollo-server';

export const updateActressTypeDefs = gql`
  input ActressUpdateInput {
    name: String
    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String
    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity
    height: Int
    weight: Int
    measurements: MeasurementsInput
    cupsize: Cupsize
    boobs: Boobs
    tattoos: String
    piercings: String
  }

  input MeasurementsInput {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  extend type Mutation {
    updateActress(actressId: Int!, data: ActressUpdateInput!): Actress
  }
`;
