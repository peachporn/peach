import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRef } from 'preact/hooks';
import { MovieQuery, MovieQueryVariables } from '@peach/types';
import { TitleForm } from './components/titleForm';
import { AddActressForm } from './components/addActressForm';
import { MovieMetadataTable } from './components/metadataTable';
import { movieDetailQuery } from './queries/movieDetail.gql';
import { FetishForm } from './components/fetishForm';
import { ScreencapStripForm } from './components/screencapStripForm';
import { MovieDetailActions } from './components/movieDetailActions';
import { GenreForm } from './components/genreForm';
import { Video } from '../../components/video';
import { Loading } from '../../components/loading';

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
    <Fragment>
      {loading || !movie ? (
        <Loading />
      ) : (
        <Fragment>
          <div>
            <Video ref={videoRef} src={{ 'video/mp4': movie.videoUrl }} />
            <GenreForm movie={movie} video={videoRef} />
          </div>
          <div>
            <TitleForm movie={movie} />
            <FetishForm movie={movie} />
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
