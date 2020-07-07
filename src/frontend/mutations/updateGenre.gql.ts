import { gql } from 'apollo-boost';

export const updateGenreMutation = gql`
  mutation UpdateGenre($genreId: Int!, $data: GenreUpdateInput!) {
    updateGenre(genreId: $genreId, data: $data) {
      id
    }
  }
`;
