import { Fragment, FunctionalComponent, h } from 'preact';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'preact/hooks';
import { MovieDetailQuery, MovieDetailQueryVariables } from '@peach/types';
import { equals, sortWith } from 'ramda';
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
import { GenreDisplayClip } from './components/highlightForm/genreFormClip';
import { GenreGrid } from './components/highlightForm/genreGrid';
import { GenreDefinitionDraft } from './components/highlightForm/types';
import { MetadataTable } from './components/metadataTable';
import { MovieForm } from './components/movieForm';
import { HighlightForm } from './components/highlightForm';
import { useMovieHighlightForm } from './hooks/useMovieHighlightForm';
import { movieDetailQuery } from './queries/movieDetail.gql';

export type MovieDetailPageProps = {
  movieId: string;
};

export const MovieDetailPage: FunctionalComponent = () => {
  const history = useHistory();

  const params = useParams<MovieDetailPageProps>();
  const movieId = parseInt(params.movieId, 10);

  const videoRef = useRef<HTMLVideoElement>();

  const movieHighlightForm = useMovieHighlightForm();
  const [genreDefinitions, setGenreDefinitions] = useState<GenreDefinitionDraft[]>([]);
  const [editing, setEditing] = useState(false);

  const { loading, data, refetch } = useQuery<MovieDetailQuery, MovieDetailQueryVariables>(
    movieDetailQuery,
    {
      skip: !movieId,
      variables: {
        id: movieId,
      },
    },
  );

  const movie = data?.movie;

  useEffect(() => {
    if (!movie) return;
    setGenreDefinitions(movie.genres);
  }, [movie]);

  useScrollToTop([editing], () => !editing);

  const submitHighlightForm = () => {
    if (equals(genreDefinitions, movie?.genres)) return Promise.resolve();

    return movieHighlightForm.submit({
      movieId,
      genreDefinitions: genreDefinitions.map(g => ({
        timeStart: g.timeStart,
        genre: {
          parent: g.genre.parent.id,
          children: g.genre.children.map(c => c.id),
        },
      })),
    });
  };

  return !movieId ? null : (
    <Fragment>
      <Helmet>
        <title>
          {movie?.title || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      {loading || !movie ? null : (
        <Fragment>
          {/* @ts-ignore */}
          <Video ref={videoRef} src={{ 'video/mp4': movie.videoUrl }} />
          {editing ? (
            <HighlightForm
              genreDefinitions={genreDefinitions}
              setGenreDefinitions={setGenreDefinitions}
              form={movieHighlightForm.form}
              video={videoRef}
            />
          ) : (
            <div className={'bg-white w-full h-14'}>
              {!videoRef.current ? null : (
                <GenreGrid
                  genreDefinitions={genreDefinitions}
                  setGenreDefinitions={setGenreDefinitions}
                  video={videoRef}
                  focusedGenre={null}
                  focusGenre={() => {}}
                  form={movieHighlightForm.form}
                  ClipComponent={GenreDisplayClip}
                />
              )}
            </div>
          )}
        </Fragment>
      )}
      <section className="bg-white p-8 min-h-screen shadow-lg relative pb-14">
        <div className="max-w-screen-xl mx-auto">
          {loading || !movie ? (
            <Loading />
          ) : editing ? (
            <MovieForm
              movie={movie}
              onCancel={() => setEditing(false)}
              onSubmit={() =>
                submitHighlightForm().then(() => {
                  setEditing(false);
                  return refetch();
                })
              }
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
              {!movie.metaData || !movie.volume ? null : (
                <MetadataTable metadata={movie.metaData} volume={movie.volume} path={movie.path} />
              )}
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
