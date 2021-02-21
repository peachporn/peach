import gql from 'graphql-tag';

export const updateMovieMutation = gql`
  mutation UpdateMovie($movieId: Int!, $input: UpdateMovieInput!) {
    updateMovie(movieId: $movieId, data: $input) {
      id
    }
  }
`;
