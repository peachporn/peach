import gql from 'graphql-tag';

export const actressDetailFragment = gql`
  fragment ActressDetail on Actress {
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
    age

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
`;
