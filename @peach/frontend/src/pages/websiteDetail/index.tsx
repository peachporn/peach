import { useQuery } from '@apollo/client';
import { WebsiteDetailQuery, WebsiteDetailQueryVariables } from '@peach/types';
import { shuffle } from '@peach/utils/src/list';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { CoverScreencaps } from '../../components/coverScreencaps';
import { GenreCard } from '../../components/genreCard';
import { Icon } from '../../components/icon';
import { Image } from '../../components/image';
import { Loading } from '../../components/loading';
import { useRefetchingImage } from '../../hooks/useRefetchingImage';
import { i } from '../../i18n/i18n';
import { genreDetailRoute } from '../../utils/route';
import { EditWebsiteForm } from './components/editWebsiteForm';
import { websiteDetailQuery } from './queries/websiteDetail.gql';

const screencapsForWebsite = (website: WebsiteDetailQuery['website']) =>
  shuffle(
    [
      ...(website?.movies || []).map(m => ({
        movieTitle: m.title,
        src: m.screencaps.find(s => s.cover)!.src,
      })),
      ...(website?.movies || []).flatMap(m =>
        m.screencaps
          .filter(s => !s.cover)
          .map(s => ({
            movieTitle: m.title,
            src: s.src,
          })),
      ),
    ]
      .filter(Boolean)
      .slice(0, 6),
  );

export type WebsiteDetailPageProps = {
  websiteId: string;
};

export const WebsiteDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const params = useParams<WebsiteDetailPageProps>();
  const websiteId = parseInt(params.websiteId, 10);
  if (!websiteId) {
    return null;
  }

  const { loading, data, refetch } = useQuery<WebsiteDetailQuery, WebsiteDetailQueryVariables>(
    websiteDetailQuery,
    {
      variables: {
        id: websiteId,
      },
    },
  );

  const website = data?.website;
  const [picture, refetchPicture] = useRefetchingImage(website?.picture ?? undefined);

  return (
    <Fragment>
      <Helmet>
        <title>
          {website?.name || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <div className="flex flex-col relative">
          <CoverScreencaps screencaps={screencapsForWebsite(website)} />
          <h1 className="-mt-9 mx-auto max-w-screen-lg w-full font-display text-3xl text-white pl-6 md:pl-0 text-shadow-md">
            {website?.name || ''}
          </h1>
        </div>
        <section className="bg-white p-8 min-h-screen/2 shadow-lg relative">
          {loading || !website ? (
            <Loading />
          ) : (
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-5 ">
              <Image
                key={picture}
                className="w-full md:w-64 rounded mb-3 md:pr-3 object-contain md:col-span-2 md:row-span-3 bg-gray-100 p-3"
                alt={website.name}
                src={picture}
              />
              <a className="text-pink my-4 flex items-center md:col-span-3" href={website.url}>
                <Icon className="mr-2" icon="language" />
                <span className="font-bold break-all">{website.url}</span>
              </a>
              {!website.fetish ? null : (
                <Fragment>
                  <h2 className="border-b border-gray-200 mb-2 text-md md:col-span-3">
                    {i('FETISH')}
                  </h2>
                  <GenreCard
                    onClick={() => {
                      history.push(genreDetailRoute(website.fetish!.id));
                    }}
                    genre={website.fetish}
                    className="w-1/3 md:w-2/3"
                  />
                </Fragment>
              )}
              <EditWebsiteForm
                website={website}
                onSubmit={() => {
                  refetch().then(refetchPicture);
                }}
              />
            </div>
          )}
        </section>
      </main>
    </Fragment>
  );
};
