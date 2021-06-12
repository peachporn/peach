import gql from 'graphql-tag';

export const actressScrapeResult = gql`
  fragment ScrapedActress on ScrapedActress {
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

  fragment ScrapeAlternative on ScrapeAlternative {
    name
    aliases
    pictureUrl
  }

  fragment ActressScrapeResult on ActressScrapeResult {
    actress {
      ...ScrapedActress
    }
    alternatives {
      ...ScrapeAlternative
    }
  }
`;
