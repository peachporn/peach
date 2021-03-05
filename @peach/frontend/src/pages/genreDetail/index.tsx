import { Fragment, FunctionalComponent, h } from 'preact';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GenreDetailQuery, GenreDetailQueryVariables } from '@peach/types';
import { Helmet } from 'react-helmet';
import { genreDetailQuery } from './queries/genreDetail.gql';
import { Loading } from '../../components/loading';
import { colorCodeKinkiness } from '../../domain/genre';
import { Image } from '../../components/image';
import { shuffle } from '../../utils/list';
import { GenreCard } from '../../components/genreCard';
import { i } from '../../i18n/i18n';
import { EditGenreForm } from './components/editGenreForm';

const screencapsForGenre = (genre: GenreDetailQuery['genre']) =>
  shuffle(
    [
      ...(genre?.fetishMovies || []).map(m => ({
        movie: m,
        screencap: m.screencaps.find(s => s.cover),
      })),
      ...(genre?.movies || []).map(m => ({
        movie: m,
        screencap: m.screencaps.find(s => s.cover),
      })),
      ...(genre?.fetishMovies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movie: m,
            screencap: s,
          })),
      ),
      ...(genre?.movies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movie: m,
            screencap: s,
          })),
      ),
    ]
      .filter(Boolean)
      .slice(0, 6),
  );

export type GenreDetailPageProps = {
  genreId: string;
};

export const GenreDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const params = useParams<GenreDetailPageProps>();
  const genreId = parseInt(params.genreId, 10);
  if (!genreId) {
    return null;
  }

  const { loading, data, refetch } = useQuery<GenreDetailQuery, GenreDetailQueryVariables>(
    genreDetailQuery,
    {
      variables: {
        id: genreId,
      },
    },
  );

  const genre = data?.genre;

  return (
    <Fragment>
      <Helmet>
        <title>
          {genre?.name || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 min-h-screen/2">
            {screencapsForGenre(genre).map(({ movie, screencap }) => (
              <Image
                className="filter-grayscale blend-multiply opacity-70 -z-1 min-w-full min-h-full object-cover"
                alt={movie.title}
                src={screencap?.src}
              />
            ))}
          </div>
          <h1 className="block -mt-9 mx-auto w-full max-w-screen-md font-display text-3xl text-white pl-6 md:pl-0 text-shadow-md">
            {genre?.name || ''}
          </h1>
        </div>
        <section className="bg-white p-8 min-h-screen/2 shadow-lg relative">
          {loading || !genre ? (
            <Loading />
          ) : (
            <Fragment>
              <div className="flex w-full justify-between md:max-w-screen-md m-auto">
                <span>{genre.category}</span>
                <div className="flex items-end -mt-32">
                  <span
                    className={`text-4xl font-bold mr-3 text-center -mb-2 text-${colorCodeKinkiness(
                      genre.kinkiness,
                    )}`}
                  >
                    {genre.kinkiness}
                  </span>
                  <Image className="rounded max-w-xs" alt={genre.name} src={genre.picture} />
                </div>
              </div>
              {!genre.linkableChildren.length ? null : (
                <div className="max-w-screen-md mx-auto">
                  <h2 className="text-lg border-gray-200 border-b mt-8">{i('SUBGENRES')}</h2>
                  <div className="grid grid-cols-4 md:grid-cols-6 pt-2 gap-2">
                    {genre.linkableChildren.map(g => (
                      <GenreCard genre={g} />
                    ))}
                  </div>
                </div>
              )}
              <div />
              <EditGenreForm
                genre={genre}
                onSubmit={() => {
                  refetch();
                }}
              />
            </Fragment>
          )}
        </section>
      </main>
    </Fragment>
  );
};
