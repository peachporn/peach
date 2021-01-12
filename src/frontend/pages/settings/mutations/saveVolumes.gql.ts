import { gql } from 'apollo-boost';

export const saveVolumesMutation = gql`
  mutation SaveVolumes($input: SaveVolumesInput!) {
    saveVolumes(input: $input) {
      name
      path
    }
  }
`;
