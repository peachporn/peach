import gql from 'graphql-tag';

export const updateGenreDefinitionsMutation = gql`
  mutation UpdateGenreDefinitions($movieId: Int!, $genreDefinitions: [GenreDefinitionInput!]!) {
    updateGenreDefinitions(movieId: $movieId, genreDefinitions: $genreDefinitions) {
      id
    }
  }
`;
