import { QueryMoviesArgs } from '@peach/types';
import { Context } from '../../../../context';
import { applyMovieFilter } from './filter';

export const resolveMovies = (
  { skip, limit, sort, filter }: QueryMoviesArgs,
  { prisma }: Context,
) =>
  prisma.movie.findMany({
    skip: skip || 0,
    take: limit || 30,
    orderBy: sort === 'CREATED_AT_DESC' ? { createdAt: 'desc' } : { id: 'asc' },
    ...applyMovieFilter(filter),
    include: {
      genres: true,
      actresses: true,
      fetishes: true,
      website: true,
    },
  });
