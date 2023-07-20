import { gql } from 'apollo-server';

export const actressFiltersTypeDefs = gql`
  type NameActressFilter {
    name: String!
  }

  type EquipmentActressFilter {
    type: EquipmentInputType
  }

  union ActressFilter = NameActressFilter | EquipmentActressFilter

  extend type Query {
    actressFilters(query: String!): [ActressFilter!]!
  }
`;
