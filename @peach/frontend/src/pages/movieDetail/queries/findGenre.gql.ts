import gql from 'graphql-tag';
import { genreActionCardFragment } from '../components/genreForm/genreActionCard/genreActionCardFragment.gql';

export const findGenreQuery = gql`
  query FindGenre($name: String!, $fetish: Boolean) {
    genres(filter: { name: $name, fetish: $fetish }, limit: 8) {
      ...GenreActionCard
    }
  }

  ${genreActionCardFragment}
`;
