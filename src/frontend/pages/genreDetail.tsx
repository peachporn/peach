import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'preact/hooks';
import { Button, Container, Flex, Headline1, Loading, ScreencapGrid } from '../../components';
import { BasePage } from './basePage';
import { genreDetailQuery } from '../queries/genreDetail.gql';
import { PageIntro } from '../../components/components/pageIntro';
import { forceLength, shuffle } from '../../utils/list';
import { i } from '../i18n/i18n';
import { genreDetailRoute, genreEditRoute, isGenreEditRoute } from '../utils/route';
import { Image } from '../../components/components/image';
import { GenreDataForm } from '../components/genreDetail/genreDataForm';
import { Text } from '../../components/components/text';
import { KinkScore } from '../../components/components/kinkScore';

export type GenreDetailPageProps = {
  genreId: string;
};

export const GenreDetailPage: FunctionalComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<GenreDetailPageProps>();
  const [editingData, setEditingData_] = useState<boolean>(!!isGenreEditRoute(location.pathname));

  const genreId = parseInt(params.genreId, 10);
  if (!genreId) {
    return null;
  }

  const setEditingData = (x: boolean) => {
    setEditingData_(x);
    if (x) {
      history.push(genreEditRoute(genreId));
    } else {
      history.push(genreDetailRoute(genreId));
    }
  };

  const { loading, data, refetch } = useQuery<GenreQuery, GenreQueryVariables>(genreDetailQuery, {
    variables: {
      id: genreId,
    },
  });

  const genre = data?.genre;

  return (
    <BasePage className="genre-detail-page">
      {loading || !genre ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <PageIntro>
            <ScreencapGrid />
          </PageIntro>
          <Container background="white">
            <Image className="genre-detail-card" alt={genre.name} src={genre.picture} />
            <div className="genre-detail__controls">
              {!editingData && (
                <Fragment>
                  <Button
                    onClick={() => {
                      setEditingData(true);
                    }}
                  >
                    {i('EDIT')}
                  </Button>
                </Fragment>
              )}
            </div>
            {editingData ? (
              <GenreDataForm
                genre={genre}
                submit={() => {
                  setEditingData(false);
                  return refetch();
                }}
                cancel={() => setEditingData(false)}
              />
            ) : (
              <Fragment>
                <div className="genre-detail-header">
                  <Headline1>{genre.name}</Headline1>
                  <Text>{genre.category}</Text>
                </div>
                <KinkScore value={genre.kinkiness} scale="genre" />
              </Fragment>
            )}
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
