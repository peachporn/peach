import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useRef } from 'preact/hooks';
import { Video, Container, Flex, Loading } from '../../components';
import { BasePage } from './basePage';
import { movieDetailQuery } from '../queries/movieDetail.gql';
import { MovieMetadataTable } from '../../components/compositions/movieMetadataTable';
import { ScreencapStripForm } from '../components/movieDetail/screencapStripForm';
import { TitleForm } from '../components/movieDetail/titleForm';
import { AddActressForm } from '../components/movieDetail/addActressForm';
import { PageIntro } from '../../components/components/pageIntro';
import { MovieDetailActions } from '../components/movieDetail/movieDetailActions';
import { SceneForm } from '../components/movieDetail/sceneForm';
import { throttle } from '../../utils/debounce';

export type MovieDetailPageProps = {
  movieId: string;
};

export const MovieDetailPage: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement>();
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
    <BasePage className="movie-detail-page">
      {loading || !movie ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <PageIntro>
            <Video ref={videoRef} src={{ 'video/mp4': movie.url }} />
            <SceneForm movie={movie} video={videoRef} />
          </PageIntro>
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
            <MovieDetailActions movie={movie} />
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
