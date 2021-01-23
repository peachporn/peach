import gql from 'graphql-tag';

export const actressScrapeResult = gql`
  fragment ActressScrapeResult on ActressScrapeResult {
    name
    aliases
    picture

    haircolor
    eyecolor
    ethnicity

    cupsize
    measurements {
      bust
      waist
      hips
    }
    boobs

    height
    weight

    dateOfBirth
    dateOfCareerstart
    dateOfRetirement
    dateOfDeath

    country
    province
    city

    piercings
    tattoos

    socialMediaLinks
    officialWebsite
  }
`;
