import { gql } from 'apollo-boost';

export const findActressQuery = gql`
  query findActress($name: String!) {
    actresses(name: $name) {
      id
      name
      picture
    }
  }
`;
