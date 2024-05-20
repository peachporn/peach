import { useQuery } from '@apollo/client';
import { WebsiteCountQuery, WebsiteListQuery, WebsiteListQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Pagination } from '../../components/pagination';
import { WebsiteCard } from '../../components/websiteCard';
import { i } from '../../i18n/i18n';
import { websiteDetailRoute } from '../../utils/route';
import { usePagination } from '../../utils/usePagination';
import { CreateWebsiteFloatingButton } from './components/createWebsiteFloatingButton';
import { WebsiteFilter } from './components/websiteFilter';
import { WebsiteFilterContext, WebsiteFilterProvider } from './context/websiteFilter';
import { websiteCountQuery } from './queries/websiteCount.gql';
import { websiteListQuery } from './queries/websiteList.gql';

const pageLength = 24;

const WebsitesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
  const { filterInput } = useContext(WebsiteFilterContext);
  const count = useQuery<WebsiteCountQuery>(websiteCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength,
    maxItems: count.data.websiteCount,
  });
  const { limit, backToStart, skip, page } = pagination;

  const { refetch, loading, data } = useQuery<WebsiteListQuery, WebsiteListQueryVariables>(
    websiteListQuery,
    {
      variables: {
        filter: filterInput,
        limit,
        skip,
      },
    },
  );

  useEffect(() => {
    backToStart();
    refetch();
  }, [filterInput]);

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_WEBSITES')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
          {i('NAVIGATION_WEBSITES')}
        </h1>
        <WebsiteFilter />
        <section className="bg-white p-8 min-h-screen shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              {data?.websites.total === 0 ? null : (
                <span className={'text-sm'}>
                  {i('FOUND_X_WEBSITES', {
                    count: data?.websites.total.toString() ?? '?',
                    from: ((page - 1) * pageLength + 1).toString(),
                    to: Math.min(page * pageLength, data?.websites.total || Infinity).toString(),
                  })}
                </span>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
                {(data?.websites.websites || []).map(website => (
                  <WebsiteCard
                    key={website.id}
                    onClick={() => {
                      history.push(websiteDetailRoute(website.id));
                    }}
                    website={website}
                  />
                ))}
              </div>
              <Pagination pagination={pagination} />
            </Fragment>
          )}
        </section>
        <CreateWebsiteFloatingButton onSubmit={count.refetch} />
      </main>
    </Fragment>
  );
};

export const WebsitesPage = () => (
  <WebsiteFilterProvider>
    <WebsitesPageComponent />
  </WebsiteFilterProvider>
);
