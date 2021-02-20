import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRef } from 'preact/hooks';
import { MovieDetailQuery, MovieDetailQueryVariables } from '@peach/types';
import { movieDetailQuery } from './queries/movieDetail.gql';
import { FetishForm } from './components/fetishForm';
import { Video } from '../../components/video';
import { Loading } from '../../components/loading';
import { GenreForm } from './components/genreForm';

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
  const { loading, data, refetch } = useQuery<MovieDetailQuery, MovieDetailQueryVariables>(
    movieDetailQuery,
    {
      variables: {
        id: movieId,
      },
    },
  );

  const movie = data?.movie;

  return (
    <Fragment>
      {loading || !movie ? (
        <Loading />
      ) : (
        <Fragment>
          <Video ref={videoRef} src={{ 'video/mp4': movie.videoUrl }} />
          <GenreForm movie={movie} video={videoRef} onSubmit={refetch} />
        </Fragment>
      )}
    </Fragment>
  );
};
