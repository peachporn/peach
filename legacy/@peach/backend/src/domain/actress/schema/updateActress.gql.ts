import { gql } from 'apollo-server';

export const updateActressTypeDefs = gql`
  input UpdateActressInput {
    name: String
    imageUrl: String
    aliases: [String!]

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    genderExpression: GenderExpression
    haircolor: Haircolor
    eyecolor: Eyecolor
    equipment: [EquipmentInput]
    piercings: String
    tattoos: String
    height: Int
    weight: Int
    measurements: MeasurementsInput

    country: String
    province: String
    city: String

    socialMediaLinks: [String]
    officialWebsite: String
  }

  enum EquipmentInputType {
    Tits
    Dick
    Pussy
  }

  input EquipmentInput {
    type: EquipmentInputType!
    size: Cupsize
    hasImplants: Boolean
  }

  input MeasurementsInput {
    chest: Int!
    waist: Int!
    hips: Int!
  }

  extend type Mutation {
    updateActress(actressId: Int!, data: UpdateActressInput!): Actress
  }
`;
