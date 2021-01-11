import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Flex, Loading, MovieList, MovieListMovie } from '../../components';
import { BasePage } from './basePage';
import { movieCountQuery, movieListQuery } from '../queries/movieList.gql';
import { usePagination } from '../utils/pagination';

import { movieDetailRoute } from '../utils/route';
import { Pagination } from '../../components/components/pagination';

const pageLength = 12;

const transformMovie = (movie: MovieListQuery['movies'][number]): MovieListMovie => ({
  title: movie.title,
  link: movieDetailRoute(movie.id),
  fresh: movie.fresh,
  screencaps: movie.screencaps,
  cover: movie.coverIndex,
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
    <BasePage>
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
    </BasePage>
  );
};
