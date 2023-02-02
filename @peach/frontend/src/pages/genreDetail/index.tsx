import { useQuery } from '@apollo/client';
import { GenreDetailQuery, GenreDetailQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { CoverScreencaps } from '../../components/coverScreencaps';
import { GenreCard } from '../../components/genreCard';
import { Image } from '../../components/image';
import { Loading } from '../../components/loading';
import { colorCodeKinkiness } from '../../domain/genre';
import { useRefetchingImage } from '../../hooks/useRefetchingImage';
import { i } from '../../i18n/i18n';
import { EditGenreForm } from './components/editGenreForm';
import { genreDetailQuery } from './queries/genreDetail.gql';
import { screencapsForGenre } from './utils/screencapsForGenre';

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
  const [picture, refetchPicture] = useRefetchingImage(genre?.picture);

  return (
    <Fragment>
      <Helmet>
        <title>
          {genre?.name || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <div className="flex flex-col relative">
          <CoverScreencaps screencaps={screencapsForGenre(genre)} />
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
                  <Image
                    key={picture}
                    className="rounded max-w-xs"
                    alt={genre.name}
                    src={picture}
                  />
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
                  refetch().then(refetchPicture);
                }}
              />
            </Fragment>
          )}
        </section>
      </main>
    </Fragment>
  );
};
