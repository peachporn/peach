import gql from 'graphql-tag';

export const updateGenreMutation = gql`
  mutation UpdateGenre($genreId: Int!, $data: UpdateGenreInput!) {
    updateGenre(genreId: $genreId, data: $data) {
      id
    }
  }
`;
