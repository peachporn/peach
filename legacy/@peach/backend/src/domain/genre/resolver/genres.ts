import { GenreFilterInput } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { transformGenre } from '../transformer/genre';

export const applyGenreFilter = (
  filter: GenreFilterInput | undefined,
): Pick<Prisma.GenreFindManyArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.ids
            ? {}
            : {
                id: {
                  in: filter.ids,
                },
              }),
          ...(!filter.name
            ? {}
            : {
                name: {
                  contains: filter.name,
                },
              }),
          ...(!filter.fetish
            ? {}
            : {
                validAsFetish: filter.fetish,
              }),
          ...(!filter.category
            ? {}
            : {
                category: filter.category,
              }),
          ...(!filter.minKinkiness
            ? {}
            : {
                kinkiness: {
                  gte: filter.minKinkiness,
                },
              }),
        },
      };

export const genresResolvers: Resolvers = {
  Query: {
    genres: async (_parent, { filter, skip, limit }, { prisma }) => {
      if (limit === 0) return { total: 0, genres: [] };

      const filteredCount = await prisma.genre.count({
        ...applyGenreFilter(filter),
      });

      return prisma.genre
        .findMany({
          skip,
          orderBy: {
            name: 'asc',
          },
          take: limit || 30,
          ...applyGenreFilter(filter),
          include: { linkableChildren: true, linkableParents: true },
        })
        .then(genres => ({
          total: filteredCount,
          genres: genres.map(transformGenre),
        }));
    },
  },
};
