import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'preact/hooks';
import { Container, Flex, Loading, Screencap, ScreencapGrid } from '../../components';
import { BasePage } from './basePage';
import { actressDetailQuery } from '../queries/actressDetail.gql';
import { PageIntro } from '../../components/components/pageIntro';
import { forceLength, shuffle } from '../../utils/list';
import { ActressDetailHeader } from '../../components/compositions/actressDetailHeader';
import { ActressDataGrid } from '../../components/compositions/actressDataGrid';
import { ActressCard } from '../../components/components/actressCard';

export type ActressDetailPageProps = {
  actressId: string;
};

export const ActressDetailPage: FunctionalComponent = () => {
  const params = useParams<ActressDetailPageProps>();
  const actressId = parseInt(params.actressId, 10);
  if (!actressId) {
    return null;
  }

  const { loading, data } = useQuery<ActressQuery, ActressQueryVariables>(actressDetailQuery, {
    variables: {
      id: actressId,
    },
  });

  const [screencaps, setScreencaps] = useState<{ screencap: string; title: string }[]>([]);

  useEffect(() => {
    const caps =
      data?.actress?.movies?.flatMap(m =>
        m.screencaps.map(s => ({ screencap: s, title: m.title })),
      ) || [];
    setScreencaps(forceLength(15, shuffle(caps)));
  }, [data]);

  const actress = data?.actress;

  return (
    <BasePage className="actress-detail-page">
      {loading || !actress ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <PageIntro>
            <ScreencapGrid>
              {screencaps.map(s => (
                <Screencap name={s.title} url={s.screencap} appearance="tint" />
              ))}
            </ScreencapGrid>
          </PageIntro>
          <Container background="white">
            <ActressCard
              className="actress-detail-card"
              name={actress.name}
              imageUrl={actress.picture}
              shadow
              noName
            />
            <ActressDetailHeader actress={actress} />
            <ActressDataGrid actress={actress} />
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
