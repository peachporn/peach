import { gql } from 'apollo-server';

export const movieMetadataTypeDefs = gql`
  type MovieMetadata {
    quality: Quality!
    format: Format!
    fps: Int!
    durationSeconds: Int!
    minutes: Int!
    seconds: Int!
    sizeInKB: Int!
    sizeInMB: Int!
  }

  enum Quality {
    SD
    HD
    FullHD
    UHD
  }

  enum Format {
    mkv
    mp4
    wmv
    avi
  }
`;
