import { gql } from 'apollo-server';

export const typeDef = gql`
  type GeoLocation {
    longitude: String!
    latitude: String!
  }
`;
