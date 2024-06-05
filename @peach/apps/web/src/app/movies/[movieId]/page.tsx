import { MoviePlayer } from "@/components/organisms/movie-player";
import { fetchAllMovieIds } from "@/lib/db/movies/allIds";
import { fetchMovie } from "@/lib/db/movies/detail";
import { redirect } from "next/navigation";

export const generateStaticParams = async () =>
  fetchAllMovieIds().then((ids) => ids.map((id) => ({ params: { movieId: id.toString() } })));

type MoviePageParams = {
  movieId: string;
};

const movieIdFromParams = ({ movieId }: MoviePageParams) => {
  try {
    return parseInt(movieId, 10);
  } catch {
    redirect("/404");
  }
};

const MoviePage = async ({ params }: { params: { movieId: string } }) => {
  const movie = await fetchMovie(movieIdFromParams(params));

  return !movie.id ? null : (
    <div className='grid gap-y-6 pt-8 [grid-template-areas:"video""headline"]'>
      <div className='[grid-area:video]'>
        <MoviePlayer id={movie.id} cover={movie.cover ?? 3} />
      </div>
      <h1 className='display text-3xl [grid-area:headline]'>{movie.title}</h1>
    </div>
  );
};

export default MoviePage;
