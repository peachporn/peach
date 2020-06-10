import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Flex, Loading, MovieList, MovieListMovie } from '../../components';
import { BasePage } from './basePage';
import { movieCountQuery, movieListQuery } from '../queries/movieList.gql';
import { usePagination } from '../utils/pagination';

import { movieDetailRoute, movieEditRoute } from '../utils/route';

const pageLength = 30;

const transformMovie = (movie: MovieListQuery['movieList'][number]): MovieListMovie => ({
  title: movie.title,
  links: {
    detail: movieDetailRoute(movie.id),
    edit: movieEditRoute(movie.id),
  },
  fresh: movie.fresh,
  screencaps: movie.screencaps,
  cover: movie.coverIndex,
});

export const MoviesPage: FunctionalComponent = () => {
  const count = useQuery<MovieCountQuery>(movieCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip } = usePagination({
    pageLength,
    maxItems: count.data.movieCount,
  });

  const { loading, data } = useQuery<MovieListQuery, MovieListQueryVariables>(movieListQuery, {
    variables: {
      limit,
      skip,
    },
  });

  return (
    <BasePage>
      {loading ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <MovieList movies={data?.movieList.map(transformMovie) || []} />
      )}
    </BasePage>
  );
};
