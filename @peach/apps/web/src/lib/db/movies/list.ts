import { db } from "@peach/database";
import { cache } from "react";

type FetchMoviesOptions =
  | {
      limit?: number;
    }
  | undefined;

export const fetchMovies = cache(({ limit = 60 }: FetchMoviesOptions = {}) =>
  db.query.movie
    .findMany({
      limit,
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
      },
    })
    .then((m) =>
      m.map((movie) => ({
        ...movie,
        actresses: movie.movieActresses.map((a) => a.actress),
        genres: movie.movieGenres.map((g) => g.genre),
        metadata: movie.movieMetadata.at(0),
      }))
    )
);
