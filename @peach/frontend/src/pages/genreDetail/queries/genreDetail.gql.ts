import gql from 'graphql-tag';
import { genreDetailFragment } from '../fragments/genreDetail.gql';

export const genreDetailQuery = gql`
  query GenreDetail($id: Int!) {
    genre(id: $id) {
      ...GenreDetail
    }
  }

  ${genreDetailFragment}
`;
