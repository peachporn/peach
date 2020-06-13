import { FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Flex, Loading, MovieDetailVideo } from '../../components';
import { BasePage } from './basePage';
import { movieDetailQuery } from '../queries/movieDetail.gql';

export type MovieDetailPageProps = {
  movieId: string;
};

export const MovieDetailPage: FunctionalComponent = () => {
  const params = useParams<MovieDetailPageProps>();
  const movieId = parseInt(params.movieId, 10);
  if (!movieId) {
    return null;
  }
  const { loading, data } = useQuery<MovieQuery, MovieQueryVariables>(movieDetailQuery, {
    variables: {
      id: movieId,
    },
  });

  const movie = data?.movie;

  return (
    <BasePage>
      {loading || !movie ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <MovieDetailVideo movie={movie} />
      )}
    </BasePage>
  );
};
