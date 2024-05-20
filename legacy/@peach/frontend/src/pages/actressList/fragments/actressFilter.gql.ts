import gql from 'graphql-tag';

export const actressFilterFragment = gql`
  fragment ActressFilter on ActressFilter {
    __typename
    ... on NameActressFilter {
      name
    }
    ... on EquipmentActressFilter {
      type
    }
  }
`;
