import gql from 'graphql-tag';
import { genreCardFragment } from '../../../components/genreCard/genreCardFragment.gql';

export const genresListQuery = gql`
  query genresList($filter: GenreFilter, $limit: Int!, $skip: Int!) {
    genres(filter: $filter, limit: $limit, skip: $skip) {
      ...GenreCard
    }
  }

  ${genreCardFragment}
`;

export const genresCountQuery = gql`
  query genresCount {
    genresCount
  }
`;
