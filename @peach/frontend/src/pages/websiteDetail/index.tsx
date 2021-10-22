import { Fragment, FunctionalComponent, h } from 'preact';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { WebsiteDetailQuery, WebsiteDetailQueryVariables } from '@peach/types';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/loading';
import { Image } from '../../components/image';
import { shuffle } from '../../utils/list';
import { GenreCard } from '../../components/genreCard';
import { i } from '../../i18n/i18n';
import { Icon } from '../../components/icon';
import { genreDetailRoute } from '../../utils/route';
import { EditWebsiteForm } from './components/editWebsiteForm';
import { websiteDetailQuery } from './queries/websiteDetail.gql';

const screencapsForWebsite = (website: WebsiteDetailQuery['website']) =>
  shuffle(
    [
      ...(website?.movies || []).map(m => ({
        movie: m,
        screencap: m.screencaps.find(s => s.cover),
      })),
      ...(website?.movies || []).flatMap(m =>
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

  return (
    <Fragment>
      <Helmet>
        <title>
          {website?.name || ''} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 min-h-screen/2">
            {screencapsForWebsite(website).map(({ movie, screencap }) => (
              <Image
                className="filter-grayscale blend-multiply opacity-70 -z-1 min-w-full min-h-full object-cover"
                alt={movie.title}
                src={screencap?.src}
              />
            ))}
          </div>
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
                className="w-full md:w-64 rounded mb-3 md:pr-3 object-contain md:col-span-2 md:row-span-3 bg-gray-100 p-3"
                alt={website.name}
                src={website.picture || ''}
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
                  refetch();
                }}
              />
            </div>
          )}
        </section>
      </main>
    </Fragment>
  );
};
