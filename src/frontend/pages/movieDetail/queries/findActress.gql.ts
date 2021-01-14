import gql from 'graphql-tag';

export const findActressQuery = gql`
  query findActress($name: String!) {
    actresses(filter: { name: $name }, limit: 8) {
      id
      name
      picture
    }
  }
`;
