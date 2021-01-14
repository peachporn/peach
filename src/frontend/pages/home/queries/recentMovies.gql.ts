import gql from 'graphql-tag';
import { movieCardFragment } from '../../../components/movieCard/movieCardFragment.gql';

export const recentMoviesQuery = gql`
  query RecentMovies {
    movies(limit: 10, sort: CREATED_AT_DESC) {
      ...MovieCard
    }
  }

  ${movieCardFragment}
`;
