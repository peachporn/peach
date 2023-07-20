import gql from 'graphql-tag';

export const actressFiltersQuery = gql`
  query actressFilters($query: String!) {
    actressFilters(query: $query) {
      __typename
      ... on NameActressFilter {
        name
      }
      ... on EquipmentActressFilter {
        type
      }
    }
  }
`;
