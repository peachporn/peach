import { gql } from 'apollo-boost';

export const updateGenreMutation = gql`
  mutation UpdateGenre($genreId: Int!, $data: GenreUpdateInput!) {
    updateGenre(genreId: $genreId, data: $data) {
      id
    }
  }
`;

export const addLinkableParentMutation = gql`
  mutation AddLinkableParent($parentId: Int!, $childId: Int!) {
    addLinkableParent(parent: $parentId, child: $childId) {
      id
      name
      category
      picture
    }
  }
`;

export const removeLinkableParentMutation = gql`
  mutation RemoveLinkableParent($parentId: Int!, $childId: Int!) {
    removeLinkableParent(parent: $parentId, child: $childId) {
      id
    }
  }
`;
