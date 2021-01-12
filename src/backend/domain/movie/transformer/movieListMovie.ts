import { Prisma } from '@prisma/client';

export const transformMovieListMovie = (
  movie: Prisma.MovieGetPayload<{ include: { genres: true } }>,
): MovieListMovie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  screencaps: [],
  coverIndex: movie.cover,
  fresh: movie.genres.length > 0,
});
