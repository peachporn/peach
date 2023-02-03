import gql from 'graphql-tag';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';

export const genreListQuery = gql`
  query genreList($filter: GenreFilterInput, $limit: Int!, $skip: Int!) {
    genres(filter: $filter, limit: $limit, skip: $skip) {
      genres {
        ...GenreCard
      }
      total
    }
  }

  ${genreCardFragment}
`;
