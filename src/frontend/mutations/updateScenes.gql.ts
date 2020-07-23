import { gql } from 'apollo-boost';

export const updateScenesMutation = gql`
  mutation UpdateScenes($movieId: Int!, $scenes: [SceneInput!]!) {
    updateScenes(movieId: $movieId, scenes: $scenes) {
      id
    }
  }
`;
