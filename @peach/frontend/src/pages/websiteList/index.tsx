import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { WebsitesCountQuery, WebsitesListQuery, WebsitesListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { usePagination } from '../../utils/usePagination';
import { websitesCountQuery, websitesListQuery } from './queries/websiteList.gql';
import { CreateWebsiteForm } from './components/createWebsiteForm';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { WebsiteFilterContext, WebsiteFilterProvider } from './context/websiteFilter';
import { WebsiteFilter } from './components/websiteFilter';

const pageLength = 48;

const WebsitesPageComponent: FunctionalComponent = () => {
  const { filter } = useContext(WebsiteFilterContext);
  const count = useQuery<WebsitesCountQuery>(websitesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const { limit, skip } = usePagination({
    pageLength: count.data.websitesCount,
    maxItems: count.data.websitesCount,
  });

  const { refetch, loading, data } = useQuery<WebsitesListQuery, WebsitesListQueryVariables>(
    websitesListQuery,
    {
      variables: {
        filter,
        limit,
        skip,
      },
    },
  );

  return (
    <main className="pb-12">
      <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
        {i('NAVIGATION_WEBSITES')}
      </h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <WebsiteFilter />
        {loading ? (
          <Loading />
        ) : (
          (data?.websites || []).map(website => (
            <Fragment>
              {website.picture ? <img alt={website.name} src={website.picture} /> : null}
              <span>{website.name}</span>
            </Fragment>
          ))
        )}
      </section>
      <CreateWebsiteForm onSubmit={count.refetch} />
    </main>
  );
};

export const WebsitesPage = () => (
  <WebsiteFilterProvider>
    <WebsitesPageComponent />
  </WebsiteFilterProvider>
);
