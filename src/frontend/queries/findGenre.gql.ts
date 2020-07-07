import { gql } from 'apollo-boost';

export const findGenreQuery = gql`
  query FindGenre($name: String!) {
    genres(filter: { name: $name }, limit: 8) {
      id
      name
      category
      picture
    }
  }
`;
