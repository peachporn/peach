import gql from 'graphql-tag';

export const deleteGenreMutation = gql`
  mutation DeleteGenre($genreId: Int!) {
    deleteGenre(genreId: $genreId) {
      id
    }
  }
`;
