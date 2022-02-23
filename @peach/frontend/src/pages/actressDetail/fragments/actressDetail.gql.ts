import gql from 'graphql-tag';

export const actressDetailFragment = gql`
  fragment ActressDetail on Actress {
    id
    name
    picture
    aliases

    appearance {
      genderExpression
      haircolor
      eyecolor

      equipment {
        ... on Tits {
          hasImplants
          size
        }
      }

      height
      weight
      measurements {
        chest
        hips
        waist
      }

      piercings
      tattoos
    }

    dates {
      dateOfBirth
      dateOfCareerstart
      dateOfRetirement
      dateOfDeath
      age
      inBusiness
    }

    location {
      country
      province
      city
      location {
        latitude
        longitude
      }
    }

    contact {
      socialMediaLinks
      officialWebsite
    }

    movies {
      id
      title
      screencaps {
        src
        cover
      }
    }
  }
`;
