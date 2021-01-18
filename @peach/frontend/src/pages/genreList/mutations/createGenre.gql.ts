import gql from 'graphql-tag';

export const createGenreMutation = gql`
  mutation CreateGenre($data: GenreCreateInput!) {
    createGenre(genreInput: $data) {
      id
      name
    }
  }
`;
