import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Container, Flex, Loading, MovieDetailVideo } from '../../components';
import { BasePage } from './basePage';
import { movieDetailQuery } from '../queries/movieDetail.gql';
import { MovieMetadataTable } from '../../components/compositions/movieMetadataTable';
import { ScreencapStripForm } from '../components/movieDetail/screencapStripForm';
import { TitleForm } from '../components/movieDetail/titleForm';
import { AddActressForm } from '../components/movieDetail/addActressForm';

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

  console.log(movie && movie.actresses);
  return (
    <BasePage className="movie-detail-page">
      {loading || !movie ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <MovieDetailVideo movie={movie} />
          <Container background="white">
            <TitleForm movie={movie} />
            <AddActressForm movieId={movie.id} actresses={movie.actresses} />
            <ScreencapStripForm movie={movie} />
            {!movie.metaData || !movie.volume ? null : (
              <MovieMetadataTable
                metadata={movie.metaData}
                volume={movie.volume}
                path={movie.path}
              />
            )}
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
