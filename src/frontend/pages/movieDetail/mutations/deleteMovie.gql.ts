import { gql } from 'apollo-boost';

export const deleteMovieMutation = gql`
  mutation DeleteMovie($movieId: Int!) {
    deleteMovie(movieId: $movieId) {
      id
    }
  }
`;
