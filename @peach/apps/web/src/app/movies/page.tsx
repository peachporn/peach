import { MovieCard } from "@/components/molecules/movie-card";
import { fetchMovies } from "@/lib/db/movies/list";
import { formatDuration } from "@/lib/duration";
import { screencapForMovie } from "@/lib/screencap";
import { actressUrl, genreUrl } from "@/lib/url";

const Page = async () => {
  const movies = await fetchMovies();

  return (
    <main className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 px-6 py-8'>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          screencap={screencapForMovie(movie)}
          actresses={movie.actresses.map((actress) => ({
            label: actress.name,
            href: actressUrl(actress),
          }))}
          tags={movie.genres.map((genre) => ({
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

export default Page;
