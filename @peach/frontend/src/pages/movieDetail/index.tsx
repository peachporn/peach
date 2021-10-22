import { Fragment, FunctionalComponent, h } from 'preact';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRef, useState } from 'preact/hooks';
import { MovieDetailQuery, MovieDetailQueryVariables } from '@peach/types';
import { sortWith } from 'ramda';
import { Helmet } from 'react-helmet';
import { Video } from '../../components/video';
import { Loading } from '../../components/loading';
import { Icon } from '../../components/icon';
import { FetishBubble } from '../../components/fetishBubble';
import { Slider, SliderItem } from '../../components/slider';
import { ActressCard } from '../../components/actressCard';
import { actressDetailRoute, genreDetailRoute, websiteDetailRoute } from '../../utils/route';
import { WebsiteCard } from '../../components/websiteCard';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { i } from '../../i18n/i18n';
import { MetadataTable } from './components/metadataTable';
import { MovieForm } from './components/movieForm';
import { GenreForm } from './components/genreForm';
import { movieDetailQuery } from './queries/movieDetail.gql';
import { DangerZone } from './components/dangerZone';

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

  useScrollToTop([editing], () => !editing);

  const movie = data?.movie;

  return (
    <Fragment>
      <Helmet>
        <title>
          {movie?.title || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      {loading || !movie ? null : (
        <Fragment>
          <Video ref={videoRef} src={{ 'video/mp4': movie.videoUrl }} />
          <GenreForm movie={movie} video={videoRef} onSubmit={refetch} />
        </Fragment>
      )}
      <section className="bg-white p-8 min-h-screen shadow-lg relative pb-14">
        <div className="max-w-screen-xl mx-auto">
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
              <div className="grid grid-cols-1 gap-10 py-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 place-items-start">
                  <h1 className="md:order-1 md:col-span-4 leading-tight text-2xl md:text-4xl font-display text-pink break-all">
                    {movie.title}
                  </h1>
                  <div className="flex gap-4 md:order-2">
                    {movie.fetishes.map(f => (
                      <FetishBubble
                        onClick={() => {
                          history.push(genreDetailRoute(f.id));
                        }}
                        genre={f}
                      />
                    ))}
                  </div>
                  {!movie.website ? null : (
                    <WebsiteCard
                      className="md:order-1 md:row-span-2"
                      key={movie.website.id}
                      onClick={() => {
                        history.push(websiteDetailRoute(movie.website!.id));
                      }}
                      website={movie.website}
                    />
                  )}
                </div>
                {!movie.actresses.length ? null : (
                  <Slider className="md:grid-cols-7" padding={0}>
                    {movie.actresses.map(a => (
                      <SliderItem key={a.id}>
                        <ActressCard
                          className="h-full max-w-screen/2 min-w-screen/2 md:min-w-0"
                          onClick={() => {
                            history.push(actressDetailRoute(a.id));
                          }}
                          actress={a}
                        />
                      </SliderItem>
                    ))}
                  </Slider>
                )}
                {!movie.metaData || !movie.volume ? null : (
                  <MetadataTable
                    metadata={movie.metaData}
                    volume={movie.volume}
                    path={movie.path}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 w-full mt-10 md:mb-10 rounded">
                {movie.screencaps.map(screencap => (
                  <img
                    key={screencap.src}
                    src={screencap.src}
                    alt={`${movie.title} #${screencap.index}`}
                  />
                ))}
              </div>
              <DangerZone movieId={movie.id} />
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
        </div>
      </section>
    </Fragment>
  );
};
