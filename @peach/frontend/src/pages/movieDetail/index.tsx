import { Fragment, FunctionalComponent, h } from 'preact';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRef, useState } from 'preact/hooks';
import { MovieDetailQuery, MovieDetailQueryVariables } from '@peach/types';
import { sortWith } from 'ramda';
import { movieDetailQuery } from './queries/movieDetail.gql';
import { Video } from '../../components/video';
import { Loading } from '../../components/loading';
import { GenreForm } from './components/genreForm';
import { MovieForm } from './components/movieForm';
import { Icon } from '../../components/icon';
import { FetishBubble } from '../../components/fetishBubble';
import { Slider, SliderItem } from '../../components/slider';
import { ActressCard } from '../../components/actressCard';
import { actressDetailRoute, genreDetailRoute, websiteDetailRoute } from '../../utils/route';
import { WebsiteCard } from '../../components/websiteCard';
import { MetadataTable } from './components/metadataTable';

export type MovieDetailPageProps = {
  movieId: string;
};

export const MovieDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
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
      {loading || !movie ? null : (
        <Fragment>
          <Video ref={videoRef} src={{ 'video/mp4': movie.videoUrl }} />
          <GenreForm movie={movie} video={videoRef} onSubmit={refetch} />
        </Fragment>
      )}
      <section className="bg-white p-8 min-h-screen shadow-lg relative pb-14">
        {loading || !movie ? (
          <Loading />
        ) : editing ? (
          <MovieForm
            movie={movie}
            onSubmit={() => {
              setEditing(false);
              return refetch();
            }}
          />
        ) : (
          <Fragment>
            <h1 className="leading-loose text-2xl font-display text-pink">{movie.title}</h1>
            <div className="grid grid-cols-1 gap-10 py-4">
              <div className="grid grid-cols-4">
                {movie.fetishes.map(f => (
                  <FetishBubble
                    onClick={() => {
                      history.push(genreDetailRoute(f.id));
                    }}
                    genre={f}
                  />
                ))}
              </div>
              {!movie.actresses.length ? null : (
                <Slider padding={0}>
                  {movie.actresses.map(a => (
                    <SliderItem key={a.id}>
                      <ActressCard
                        className="h-full max-w-screen/2 min-w-screen/2"
                        onClick={() => {
                          history.push(actressDetailRoute(a.id));
                        }}
                        actress={a}
                      />
                    </SliderItem>
                  ))}
                </Slider>
              )}
              {!movie.website ? null : (
                <WebsiteCard
                  key={movie.website.id}
                  onClick={() => {
                    history.push(websiteDetailRoute(movie.website!.id));
                  }}
                  website={movie.website}
                />
              )}
              {!movie.metaData || !movie.volume ? null : (
                <MetadataTable metadata={movie.metaData} volume={movie.volume} path={movie.path} />
              )}
            </div>
            <div className="grid grid-cols-1 w-full mt-10">
              {movie.screencaps.map((screencap, i) => (
                <img
                  className={
                    i === 0 ? 'rounded-t' : i === movie.screencaps.length - 1 ? 'rounded-b' : ''
                  }
                  key={screencap.src}
                  src={screencap.src}
                  alt={`${movie.title} #${screencap.index}`}
                />
              ))}
            </div>
          </Fragment>
        )}
        <button
          className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          <Icon
            className="w-10 h-10 focus:outline-none text-3xl text-glow"
            icon={editing ? 'clear' : 'edit'}
          />
        </button>
      </section>
    </Fragment>
  );
};
