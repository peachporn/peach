import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { MovieCountQuery, MovieListQuery, MovieListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { movieCountQuery, movieListQuery } from './queries/movieList.gql';
import { usePagination } from '../../utils/usePagination';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { MovieCard } from '../../components/movieCard';
import { MovieFilterContext, MovieFilterProvider } from './context/movieFilter';
import { MovieFilter } from './components/movieFilter';

const pageLength = 12;

const MoviesPageComponent: FunctionalComponent = () => {
  const count = useQuery<MovieCountQuery>(movieCountQuery);
  const { filter } = useContext(MovieFilterContext);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const { limit, skip } = usePagination({
    pageLength,
    maxItems: count.data.movieCount,
  });

  const { loading, data } = useQuery<MovieListQuery, MovieListQueryVariables>(movieListQuery, {
    variables: {
      limit,
      skip,
      filter,
    },
  });

  return (
    <main className="pb-12">
      <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
        {i('NAVIGATION_MOVIES')}
      </h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <MovieFilter />
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {(data?.movies || []).map(m => (
              <MovieCard movie={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export const MoviesPage: FunctionalComponent = () => (
  <MovieFilterProvider>
    <MoviesPageComponent />
  </MovieFilterProvider>
);
