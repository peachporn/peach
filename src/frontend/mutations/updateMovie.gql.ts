import { gql } from 'apollo-boost';

export const updateCoverMutation = gql`
  mutation UpdateCover($movieId: Int!, $cover: Int!) {
    updateMovie(movieId: $movieId, data: { cover: $cover }) {
      coverIndex
    }
  }
`;
