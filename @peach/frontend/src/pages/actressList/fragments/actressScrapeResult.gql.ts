import gql from 'graphql-tag';

export const actressScrapeResult = gql`
  fragment ScrapedActress on ScrapedActress {
    name
    aliases
    picture

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
        waist
        hips
      }

      piercings
      tattoos
    }

    dates {
      dateOfBirth
      dateOfCareerstart
      dateOfRetirement
      dateOfDeath
    }

    location {
      country
      province
      city
    }

    contact {
      socialMediaLinks
      officialWebsite
    }
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
