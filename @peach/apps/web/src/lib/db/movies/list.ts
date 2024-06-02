import { db } from "@peach/database";
import { cache } from "react";

type FetchMoviesOptions =
  | {
      limit?: number;
    }
  | undefined;

export const fetchMovies = cache(({ limit = 60 }: FetchMoviesOptions = {}) =>
  db.query.Movie.findMany({
    limit,
    with: {
      _ActressToMovies: {
        with: {
          Actress: true,
        },
      },
      _GenreToMovies: {
        with: {
          Genre: true,
        },
      },
      MovieMetadata: true,
    },
  }).then((m) =>
    m.map((movie) => ({
      ...movie,
      actresses: movie._ActressToMovies.map((a) => a.Actress),
      genres: movie._GenreToMovies.map((g) => g.Genre),
      metadata: movie.MovieMetadata.at(0),
    }))
  )
);
