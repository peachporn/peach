import { gql } from 'apollo-boost';

export const createGenreMutation = gql`
  mutation CreateGenre($data: GenreCreateInput!) {
    createGenre(genreInput: $data) {
      id
      name
    }
  }
`;
