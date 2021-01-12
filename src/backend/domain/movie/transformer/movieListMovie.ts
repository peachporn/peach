import { Prisma } from '@prisma/client';

export const transformMovieListMovie = (
  movie: Prisma.MovieGetPayload<{ include: { genres: true } }>,
): MovieListMovie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  screencaps: [],
  cover: movie.cover,
});
