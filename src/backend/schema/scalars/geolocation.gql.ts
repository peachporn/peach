import { gql } from 'apollo-server';

export const typeDef = gql`
  type GeoLocation {
    longitude: Float!
    latitude: Float!
  }
`;
