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
