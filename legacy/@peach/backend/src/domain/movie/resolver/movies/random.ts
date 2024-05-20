import { QueryMoviesArgs } from '@peach/types';
import { shuffle } from '@peach/utils/src/list';
import { Context } from '../../../../context';
import { applyMovieFilter } from './filter';

export const resolveRandomMovies = ({ limit, filter }: QueryMoviesArgs, { prisma }: Context) =>
  prisma.movie.count().then(totalCount => {
    const blockLimit = (limit || 30) * 5;
    const randomSkip = Math.floor(
      Math.random() * Math.max(0, Math.min(totalCount, totalCount - blockLimit || 0)),
    );

    return prisma.movie
      .findMany({
        skip: randomSkip,
        take: blockLimit,
        ...applyMovieFilter(filter),
        include: {
          genres: true,
        },
      })
      .then(movies => shuffle(movies).slice(0, limit));
  });
