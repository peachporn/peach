import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Pagination } from '../../../components/components/pagination';
import { Container, Flex, Loading } from '../../../components';
import { ActressCard, ActressCardGrid } from '../../../components/components/actressCard';
import { usePagination } from '../../utils/usePagination';
import { actressesCountQuery, actressesListQuery } from './queries/actressList.gql';
import { BasePage } from '../../components/basePage';
import { actressDetailRoute } from '../../utils/route';

const pageLength = 24;

export const ActressesPage: FunctionalComponent = () => {
  const count = useQuery<ActressesCountQuery>(actressesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip, page, maxPage, nextPage, previousPage } = usePagination({
    pageLength,
    maxItems: count.data.actressesCount,
  });

  const { loading, data } = useQuery<ActressesListQuery, ActressesListQueryVariables>(
    actressesListQuery,
    {
      variables: {
        limit,
        skip,
      },
    },
  );

  return (
    <BasePage>
      {loading ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <Pagination page={page} maxPage={maxPage} onNext={nextPage} onPrevious={previousPage} />
          <Container>
            <ActressCardGrid>
              {(data?.actresses || []).map(actress => (
                <ActressCard
                  url={actressDetailRoute(actress.id)}
                  name={actress.name}
                  imageUrl={actress.picture}
                  key={actress.name}
                />
              ))}
            </ActressCardGrid>
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
