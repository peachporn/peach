import gql from 'graphql-tag';

export const deleteMovieMutation = gql`
  mutation DeleteMovie($movieId: Int!) {
    deleteMovie(movieId: $movieId) {
      id
    }
  }
`;
