import { MovieDetailVideo } from "@/components/molecules/movie-detail-video";
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
    <div>
      <h1>{movie.title}</h1>
      <MovieDetailVideo movieId={movie.id} />
    </div>
  );
};

export default MoviePage;
