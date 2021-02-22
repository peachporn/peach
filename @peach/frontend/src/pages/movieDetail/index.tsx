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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-4">
              <h1 className="md:order-1 md:col-span-3 leading-loose text-2xl md:text-4xl font-display text-pink">
                {movie.title}
              </h1>
              <div className="grid col-span-1 md:order-1 grid-cols-4 md:grid-cols-2 grid-rows-1 md:grid-rows-2">
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
                <Slider className="md:order-3 md:col-span-5" padding={0}>
                  {movie.actresses.map(a => (
                    <SliderItem key={a.id}>
                      <ActressCard
                        className="h-full max-w-screen/2 min-w-screen/2 md:min-w-0 md:w-64"
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
                  className="md:order-2"
                  key={movie.website.id}
                  onClick={() => {
                    history.push(websiteDetailRoute(movie.website!.id));
                  }}
                  website={movie.website}
                />
              )}
              {!movie.metaData || !movie.volume ? null : (
                <MetadataTable
                  className="md:order-4"
                  metadata={movie.metaData}
                  volume={movie.volume}
                  path={movie.path}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 w-full mt-10 md:mb-10">
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
