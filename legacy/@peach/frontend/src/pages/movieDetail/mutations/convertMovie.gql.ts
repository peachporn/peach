import gql from 'graphql-tag';

export const convertMovieMutation = gql`
  mutation ConvertMovie($movieId: Int!) {
    convertMovie(movieId: $movieId)
  }
`;
