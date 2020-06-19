import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Container, Flex, Loading } from '../../components';
import { BasePage } from './basePage';
import { actressesCountQuery, actressesListQuery } from '../queries/actressList.gql';
import { usePagination } from '../utils/pagination';
import { ActressCard, ActressCardList } from '../../components/components/actressCard';

const pageLength = 30;

export const ActressesPage: FunctionalComponent = () => {
  const count = useQuery<ActressesCountQuery>(actressesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip } = usePagination({
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
        <Container>
          <ActressCardList>
            {(data?.actresses || []).map(actress => (
              <ActressCard name={actress.name} imageUrl={actress.picture} />
            ))}
          </ActressCardList>
        </Container>
      )}
    </BasePage>
  );
};
