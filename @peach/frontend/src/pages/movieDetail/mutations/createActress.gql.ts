import gql from 'graphql-tag';

export const createActressMutation = gql`
  mutation CreateActress($name: String!) {
    createActress(actress: { name: $name }) {
      id
      name
    }
  }
`;
