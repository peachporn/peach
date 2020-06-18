import { gql } from 'apollo-boost';

export const createActressMutation = gql`
  mutation CreateActress($name: String!) {
    createActress(actress: { name: $name }) {
      id
      name
    }
  }
`;

export const updateInferMovieTitleMutation = gql`
  mutation UpdateInferMovieTitle($inferMovieTitle: InferMovieTitle) {
    updateInferMovieTitle(inferMovieTitle: $inferMovieTitle) {
      inferMovieTitle
    }
  }
`;

export const updateScreencapPathMutation = gql`
  mutation UpdateScreencapPath($screencapPath: String!) {
    updateScreencapPath(screencapPath: $screencapPath) {
      screencapPath
    }
  }
`;
