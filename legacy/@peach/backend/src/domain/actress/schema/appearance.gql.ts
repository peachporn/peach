import { gql } from 'apollo-server';

export const actressAppearanceTypeDefs = gql`
  enum Haircolor {
    Blonde
    Brunette
    Black
    Red
    Auburn
    Other
    Unknown
  }

  enum Eyecolor {
    Green
    Blue
    Brown
    Hazel
    Grey
    Other
    Unknown
  }

  type Measurements {
    chest: Int!
    waist: Int!
    hips: Int!
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

  type Tits {
    size: Cupsize!
    hasImplants: Boolean!
  }

  type Dick {
    isDick: Boolean
  }

  type Pussy {
    isPussy: Boolean
  }

  union Equipment = Tits | Dick | Pussy

  enum GenderExpression {
    Androgynous
    Female
    Male
  }

  type ActressAppearance {
    haircolor: Haircolor
    eyecolor: Eyecolor

    equipment: [Equipment!]!
    genderExpression: GenderExpression!

    piercings: String
    tattoos: String

    height: Int
    weight: Int
    measurements: Measurements
  }
`;
