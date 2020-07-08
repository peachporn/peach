import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';
import { Button, Container, Flex, Loading, Screencap, ScreencapGrid } from '../../components';
import { BasePage } from './basePage';
import { actressDetailQuery } from '../queries/actressDetail.gql';
import { PageIntro } from '../../components/components/pageIntro';
import { forceLength, shuffle } from '../../utils/list';
import { ActressDetailHeader } from '../../components/compositions/actressDetailHeader';
import { ActressCard } from '../../components/components/actressCard';
import { i } from '../i18n/i18n';
import { ActressDataForm } from '../components/actressDetail/actressDataForm';
import { ActressDataGrid } from '../components/actressDetail/actressDataGrid';
import { actressDetailRoute, actressEditRoute, isActressEditRoute } from '../utils/route';
import { ActressImageForm } from '../components/actressDetail/actressImageForm';
import { scrapeActressMutation } from '../mutations/scrapeActress.gql';

export type ActressDetailPageProps = {
  actressId: string;
};

export const ActressDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<ActressDetailPageProps>();
  const [editingData, setEditingData_] = useState<boolean>(!!isActressEditRoute(location.pathname));
  const actressId = parseInt(params.actressId, 10);
  if (!actressId) {
    return null;
  }

  const setEditingData = (x: boolean) => {
    setEditingData_(x);
    if (x) {
      history.push(actressEditRoute(actressId));
    } else {
      history.push(actressDetailRoute(actressId));
    }
  };

  const { loading, data, refetch } = useQuery<ActressQuery, ActressQueryVariables>(
    actressDetailQuery,
    {
      variables: {
        id: actressId,
      },
    },
  );
  const [scrapeActress] = useMutation<ScrapeActressMutation, ScrapeActressMutationVariables>(
    scrapeActressMutation,
    {
      variables: {
        id: actressId,
      },
    },
  );

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
            <div className="actress-detail__left-bar">
              <ActressCard
                className="actress-detail__card"
                name={actress.name}
                imageUrl={actress.picture}
                shadow
                noName
              />
              {!editingData && (
                <div className="actress-detail__controls">
                  <Fragment>
                    <Button
                      onClick={() => {
                        scrapeActress().then(() => {
                          toast.success(i('ACTRESS_SCRAPE_STARTED'));
                        });
                      }}
                    >
                      {i('ACTRESS_SCRAPE')}
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingData(true);
                      }}
                    >
                      {i('EDIT')}
                    </Button>
                  </Fragment>
                </div>
              )}
              {editingData && <ActressImageForm actress={actress} />}
            </div>
            {editingData ? (
              <ActressDataForm
                actress={actress}
                submit={() => {
                  setEditingData(false);
                  return refetch();
                }}
                cancel={() => setEditingData(false)}
              />
            ) : (
              <Fragment>
                <ActressDetailHeader actress={actress} />
                <ActressDataGrid actress={actress} />
              </Fragment>
            )}
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
