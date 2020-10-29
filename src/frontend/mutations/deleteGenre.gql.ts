import { gql } from 'apollo-boost';

export const deleteGenreMutation = gql`
  mutation DeleteGenre($genreId: Int!) {
    deleteGenre(genreId: $genreId) {
      id
    }
  }
`;
