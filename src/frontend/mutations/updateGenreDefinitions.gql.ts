import { gql } from 'apollo-boost';

export const updateGenreDefinitionsMutation = gql`
  mutation UpdateGenreDefinitions($movieId: Int!, $genreDefinitions: [GenreDefinitionInput!]!) {
    updateGenreDefinitions(movieId: $movieId, genreDefinitions: $genreDefinitions) {
      id
    }
  }
`;
