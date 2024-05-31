import { db } from "@peach/database";

export const fetchMovies = () =>
  db.query.Movie.findMany({
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
  );
