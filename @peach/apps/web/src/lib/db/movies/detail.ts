import { db } from "@peach/database";
import { cache } from "react";

export const fetchMovie = cache((movieId: number) =>
  db.query.movie
    .findFirst({
      where: (users, { eq }) => eq(users.id, movieId),
      with: {
        movieActresses: {
          with: {
            actress: true,
          },
        },
        movieGenres: {
          with: {
            genre: true,
          },
        },
        movieMetadata: true,
        volume: true,
      },
    })
    .then((movie) => ({
      ...movie,
      actresses: movie?.movieActresses.map((a) => a.actress),
      genres: movie?.movieGenres.map((g) => g.genre),
      metadata: movie?.movieMetadata.at(0),
    }))
);
