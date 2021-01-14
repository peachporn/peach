import gql from 'graphql-tag';

export const saveVolumesMutation = gql`
  mutation SaveVolumes($input: SaveVolumesInput!) {
    saveVolumes(input: $input) {
      name
      path
    }
  }
`;
