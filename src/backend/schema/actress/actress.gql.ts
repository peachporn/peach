import { gql } from 'apollo-server';

export const typeDef = gql`
  enum Haircolor {
    Blonde
    Brunette
    Black
    Red
    Auburn
    Other
  }

  enum Eyecolor {
    Green
    Blue
    Brown
    Hazel
    Grey
    Other
  }

  enum Ethnicity {
    Caucasian
    Asian
    Latina
    Ebony
    Native
    American
    Indian
  }

  enum Boobs {
    Natural
    Fake
  }

  enum Cupsize {
    AA
    A
    B
    C
    D
    DD
    DDD
    E
    F
    FF
    G
    H
    I
    J
    K
  }

  type Measurements {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  type Actress {
    id: Int!
    name: String!
    aliases: [String!]!

    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    inBusiness: Boolean

    country: String
    province: String
    city: String
    location: GeoLocation

    boobs: Boobs

    piercings: [String!]!
    tattoos: [String!]!

    height: Int
    weight: Int
    measurements: Measurements
    cupsize: Cupsize

    socialMediaLinks: [String]
    officialWebsite: String

    movies: [Movie!]!
  }

  input ActressCreateInput {
    name: String!
  }
  extend type Query {
    actresses(name: String!): [Actress!]!
  }

  extend type Mutation {
    createActress(actress: ActressCreateInput!): Actress!
  }
`;
