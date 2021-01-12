import { gql } from 'apollo-boost';

export const movieDetailQuery = gql`
  query movie($id: Int!) {
    movie(id: $id) {
      ...MovieDetail
    }
  }

  fragment MovieDetail on Movie {
    id
    title
    url
    path
    screencaps {
      src
      index
    }
    cover
    volume {
      name
    }
    actresses {
      id
      name
      picture
    }
    metaData {
      durationSeconds
      sizeInMB
      minutes
      seconds
      quality
      format
      fps
    }
    genres {
      timeStart
      genre {
        parent {
          id
          name
          picture
          validAsRoot
          category
          linkableChildren {
            id
          }
        }
        children {
          id
          name
          picture
          validAsRoot
          category
          linkableChildren {
            id
          }
        }
      }
    }
    fetishes {
      id
      name
      picture
    }
  }
`;
