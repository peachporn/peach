import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { Pagination } from '../../../components/components/pagination';
import { movieDetailRoute } from '../../utils/route';
import { movieCountQuery, movieListQuery } from './queries/movieList.gql';
import { Flex, Loading } from '../../../components';
import { usePagination } from '../../utils/usePagination';
import { MovieList, MovieListViewMovie } from './components/movieList';

const pageLength = 12;

const transformMovie = (movie: MovieListQuery['movies'][number]): MovieListViewMovie => ({
  title: movie.title,
  link: movieDetailRoute(movie.id),
  screencaps: movie.screencaps,
});

export const MoviesPage: FunctionalComponent = () => {
  const count = useQuery<MovieCountQuery>(movieCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip, maxPage, page, previousPage, nextPage } = usePagination({
    pageLength,
    maxItems: count.data.movieCount,
  });

  const searchParams = new URLSearchParams(window.location?.search);
  const fetish = parseInt(searchParams.get('fetish') || '0', 10);

  const { loading, data } = useQuery<MovieListQuery, MovieListQueryVariables>(movieListQuery, {
    variables: {
      limit,
      skip,
      filter: fetish ? { fetishes: [fetish] } : undefined,
    },
  });

  return (
    <Fragment>
      {loading ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <MovieList movies={(data?.movies || []).map(transformMovie)} />
          <Pagination page={page} maxPage={maxPage} onNext={nextPage} onPrevious={previousPage} />
        </Fragment>
      )}
    </Fragment>
  );
};
