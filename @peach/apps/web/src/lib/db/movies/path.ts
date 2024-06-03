import { db } from "@peach/database";
import path from "path";

export const fullPath = (movie: { volume: { path: string }; path: string }) =>
  path.join(movie.volume.path, movie.path);

export const moviePathForId = (movieId: number): Promise<string | undefined> =>
  db.query.movie
    .findFirst({
      where: (movies, { eq }) => eq(movies.id, movieId),
      with: {
        volume: true,
      },
    })
    .then((movie) => (movie ? fullPath(movie) : Promise.resolve(undefined)));
