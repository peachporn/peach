import { Resolvers } from '../../../generated/resolver-types';
import { applyActressFilter } from '../../actress/resolver/actresses';
import { applyGenreFilter } from '../../genre/resolver/genres';
import { applyWebsiteFilter } from '../../website/resolver/websites';
import {
  transformActressMovieFilter,
  transformFetishMovieFilter,
  transformWebsiteMovieFilter,
} from '../transformer/movieFilter';

export const movieFiltersResolvers: Resolvers = {
  Query: {
    movieFilters: (_parent, { query }, { prisma }) => {
      if (query === '') {
        return [
          {
            __typename: 'UntouchedMovieFilter' as const,
            untouched: true,
          },
        ];
      }

      const actresses = prisma.actress
        .findMany({
          take: 5,
          ...applyActressFilter({ name: query }),
        })
        .then(actrs => actrs.map(transformActressMovieFilter));

      const websites = prisma.website
        .findMany({
          take: 5,
          ...applyWebsiteFilter({ name: query }),
        })
        .then(wbs => wbs.map(transformWebsiteMovieFilter));

      const fetishes = prisma.genre
        .findMany({
          take: 5,
          ...applyGenreFilter({ name: query }),
        })
        .then(genres => genres.map(transformFetishMovieFilter));

      return Promise.all([actresses, websites, fetishes]).then(
        ([actressFilters, websiteFilters, fetishFilters]) => [
          {
            __typename: 'TitleMovieFilter' as const,
            title: query,
          },
          ...('untouched'.startsWith(query.toLowerCase())
            ? [
                {
                  __typename: 'UntouchedMovieFilter' as const,
                  untouched: true,
                },
              ]
            : []),
          ...actressFilters,
          ...websiteFilters,
          ...fetishFilters,
        ],
      );
    },
  },
};
