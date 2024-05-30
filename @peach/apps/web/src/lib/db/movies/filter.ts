import type { Prisma } from "@peach/db";

export type MovieFilter = {
  skip?: number;
  limit?: number;

  sort?: "CREATED_AT_DESC";

  untouched?: boolean;
  actresses?: number[];
  websites?: number[];
  title?: string;
  fetishes?: number[];
};

const touchedMovieFilter = {
  OR: [
    {
      website: {
        id: {
          gte: 0,
        },
      },
    },
    {
      actresses: {
        some: {},
      },
    },
    {
      fetishes: {
        some: {},
      },
    },
  ],
};

export const applyMovieFilter = (
  filter: MovieFilter | undefined
): Pick<Prisma.MovieFindManyArgs, "where"> =>
  !filter
    ? {}
    : {
        where: {
          ...(filter.untouched === undefined
            ? {}
            : filter.untouched
              ? { NOT: [touchedMovieFilter] }
              : {}),
          ...(!filter.actresses
            ? {}
            : {
                actresses: {
                  some: {
                    OR: filter.actresses.map((a) => ({ id: a })),
                  },
                },
              }),
          ...(!filter.websites
            ? {}
            : {
                website: {
                  OR: filter.websites.map((f) => ({ id: f })),
                },
              }),
          ...(!filter.title
            ? {}
            : {
                title: {
                  contains: filter.title,
                },
              }),
          ...(!filter.fetishes
            ? {}
            : {
                fetishes: {
                  some: {
                    OR: filter.fetishes.map((f) => ({ id: f })),
                  },
                },
              }),
        },
      };
