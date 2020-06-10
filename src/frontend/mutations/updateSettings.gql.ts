import { gql } from 'apollo-boost';

export const updateLanguageMutation = gql`
  mutation UpdateLanguage($language: Language) {
    updateLanguage(language: $language) {
      language
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
