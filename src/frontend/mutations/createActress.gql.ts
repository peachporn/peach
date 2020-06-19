import { gql } from 'apollo-boost';

export const createActressMutation = gql`
  mutation CreateActress($name: String!) {
    createActress(actress: { name: $name }) {
      id
      name
    }
  }
`;
