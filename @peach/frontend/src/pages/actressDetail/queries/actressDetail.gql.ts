import gql from 'graphql-tag';

export const actressDetailQuery = gql`
  query actress($id: Int!) {
    actress(id: $id) {
      id
      name
      picture
      aliases

      haircolor
      eyecolor
      ethnicity

      dateOfBirth
      dateOfCareerstart
      dateOfRetirement
      dateOfDeath

      inBusiness

      country
      province
      city
      location {
        latitude
        longitude
      }

      boobs

      piercings
      tattoos

      height
      weight
      measurements {
        bust
        hips
        waist
      }
      cupsize

      socialMediaLinks
      officialWebsite

      movies {
        id
        title
        screencaps {
          src
          cover
        }
      }
    }
  }
`;
