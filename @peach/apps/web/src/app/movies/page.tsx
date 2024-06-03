import { MovieCard } from "@/components/molecules/movie-card";
import { screencapForMovie } from "@/lib/assets";
import { fetchMovies } from "@/lib/db/movies/list";
import { formatDuration } from "@/lib/duration";
import { actressUrl, genreUrl, movieUrl } from "@/lib/url";

const MoviesPage = async () => {
  const movies = await fetchMovies();

  return (
    <main className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 px-6 py-8'>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          href={movieUrl(movie)}
          title={movie.title}
          screencap={screencapForMovie(movie)}
          actresses={movie.actresses.map((actress: { name?: any; id: number }) => ({
            label: actress.name,
            href: actressUrl(actress),
          }))}
          tags={movie.genres.map((genre: { name?: any; id: number }) => ({
            label: genre.name,
            href: genreUrl(genre),
          }))}
          duration={movie.metadata ? formatDuration(movie.metadata.durationSeconds) : undefined}
          negativeIndex={movies.length - index}
        />
      ))}
    </main>
  );
};

export default MoviesPage;
