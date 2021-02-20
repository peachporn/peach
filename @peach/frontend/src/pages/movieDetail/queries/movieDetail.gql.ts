import gql from 'graphql-tag';
import { movieDetailFragment } from '../fragments/movieDetail.gql';

export const movieDetailQuery = gql`
  query MovieDetail($id: Int!) {
    movie(id: $id) {
      ...MovieDetail
    }
  }

  ${movieDetailFragment}
`;
