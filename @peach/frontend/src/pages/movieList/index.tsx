import { useQuery } from '@apollo/client';
import { MovieCountQuery, MovieListQuery, MovieListQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { MovieCard } from '../../components/movieCard';
import { Pagination } from '../../components/pagination';
import { MovieFilterContext } from '../../context/movieFilter';
import { i } from '../../i18n/i18n';
import { usePagination } from '../../utils/usePagination';
import { MovieFilter } from './components/movieFilter';
import { movieCountQuery, movieListQuery } from './queries/movieList.gql';

const pageLength = 20;

export const MoviesPage: FunctionalComponent = () => {
  const history = useHistory();
  const count = useQuery<MovieCountQuery>(movieCountQuery);
  const { filterInput } = useContext(MovieFilterContext);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength,
    maxItems: count.data.movieCount.all,
  });
  const { limit, skip } = pagination;

  const { loading, data } = useQuery<MovieListQuery, MovieListQueryVariables>(movieListQuery, {
    variables: {
      limit,
      skip,
      filter: filterInput,
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
              <div>
                <span className={'text-sm'}>
                  {i('FOUND_X_MOVIES', { count: data?.movies.total.toString() ?? '?' })}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {(data?.movies.movies || []).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
              <Pagination pagination={pagination} />
            </Fragment>
          )}
        </section>
      </main>
    </Fragment>
  );
};
