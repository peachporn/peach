import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { MovieCountQuery, MovieListQuery, MovieListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { movieCountQuery, movieListQuery } from './queries/movieList.gql';
import { usePagination } from '../../utils/usePagination';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { MovieCard } from '../../components/movieCard';
import { MovieFilterContext, MovieFilterProvider } from './context/movieFilter';
import { MovieFilter } from './components/movieFilter';
import { homeRoute } from '../../utils/route';
import { Pagination } from '../../components/pagination';

const pageLength = 20;

const MoviesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
  const count = useQuery<MovieCountQuery>(movieCountQuery);
  const { filter } = useContext(MovieFilterContext);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength,
    maxItems: count.data.movieCount,
  });
  const { limit, skip } = pagination;

  const { loading, data } = useQuery<MovieListQuery, MovieListQueryVariables>(movieListQuery, {
    variables: {
      limit,
      skip,
      filter,
    },
  });

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_MOVIES')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
          {i('NAVIGATION_MOVIES')}
        </h1>
        <MovieFilter />
        <section className="bg-white p-8 min-h-screen shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                {(data?.movies || []).map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <Pagination pagination={pagination} />
            </Fragment>
          )}
        </section>
      </main>
    </Fragment>
  );
};

export const MoviesPage: FunctionalComponent = () => (
  <MovieFilterProvider>
    <MoviesPageComponent />
  </MovieFilterProvider>
);
