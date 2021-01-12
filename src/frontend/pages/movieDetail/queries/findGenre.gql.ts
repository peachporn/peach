import { gql } from 'apollo-boost';

export const findGenreQuery = gql`
  query FindGenre($name: String!, $fetish: Boolean) {
    genres(filter: { name: $name, fetish: $fetish }, limit: 8) {
      id
      name
      category
      picture
      validAsRoot
      validAsFetish
      linkableChildren {
        id
      }
    }
  }
`;
