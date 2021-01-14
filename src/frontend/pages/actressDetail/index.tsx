import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';
import { i } from '../../i18n/i18n';
import { actressDetailQuery } from './queries/actressDetail.gql';
import { ActressDataForm } from './components/actressDataForm';
import { Button, Container, Flex, Loading } from '../../../components';
import { ActressCard } from '../../../components/components/actressCard';
import { actressDetailRoute, actressEditRoute, isActressEditRoute } from '../../utils/route';
import { scrapeActressMutation } from './mutations/scrapeActress.gql';
import { PageIntro } from '../../../components/components/pageIntro';
import { ActressDataGrid } from './components/actressDataGrid';
import {
  ScreencapGrid,
  Screencap as ScreencapComponent,
} from '../movieDetail/components/screencapStrip';
import { ActressImageForm } from './components/actressImageForm';
import { forceLength, shuffle } from '../../../utils/list';
import { ActressDetailHeader } from './components/actressDetailHeader';

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

  const [screencaps, setScreencaps] = useState<
    { screencap: Pick<Screencap, 'src'>; title: string }[]
  >([]);

  useEffect(() => {
    const caps =
      data?.actress?.movies?.flatMap(m =>
        m.screencaps.map(s => ({ screencap: s, title: m.title })),
      ) || [];
    setScreencaps(forceLength(15, shuffle(caps)));
  }, [data]);

  const actress = data?.actress;

  return (
    <Fragment>
      {loading || !actress ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <PageIntro>
            <ScreencapGrid>
              {screencaps.map(s => (
                <ScreencapComponent name={s.title} url={s.screencap.src} appearance="tint" />
              ))}
            </ScreencapGrid>
          </PageIntro>
          <Container background="white">
            <div className="actress-detail__left-bar">
              {!editingData && (
                <Fragment>
                  <ActressCard
                    className="actress-detail__card"
                    name={actress.name}
                    imageUrl={actress.picture}
                    shadow
                    noName
                  />
                  <div className="actress-detail__controls">
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
                  </div>
                </Fragment>
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
    </Fragment>
  );
};
