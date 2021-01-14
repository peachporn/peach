import gql from 'graphql-tag';

export const genreDetailQuery = gql`
  query Genre($id: Int!) {
    genre(id: $id) {
      id
      name
      category
      kinkiness
      picture

      validAsRoot
      linkableChildren {
        id
        name
        category
        picture
      }
    }
  }
`;
