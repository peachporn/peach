import { Fragment, FunctionalComponent, h } from 'preact';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'preact/hooks';
import { AddSubgenreForm } from './components/addSubgenreForm';
import { genreDetailQuery } from './queries/genreDetail.gql';
import { Button, Container, Flex, Headline1, Loading } from '../../../components';
import { Image } from '../../../components/components/image';
import { Text } from '../../../components/components/text';
import { i } from '../../i18n/i18n';
import { GenreDataForm } from './components/genreDataForm';
import { genreDetailRoute, genreEditRoute, isGenreEditRoute } from '../../utils/route';
import { GenreDeleteButton } from './components/genreDeleteButton';
import { GenreImageForm } from './components/genreImageForm';
import { PageIntro } from '../../../components/components/pageIntro';
import { ScreencapGrid } from '../movieDetail/components/screencapStrip';
import { KinkScore } from '../../../components/components/kinkScore';
import { BasePage } from '../../components/basePage';

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
            <div className="genre-detail__left-bar">
              {!editingData && (
                <Fragment>
                  <Image className="genre-detail__card" alt={genre.name} src={genre.picture} />
                  <Button
                    onClick={() => {
                      setEditingData(true);
                    }}
                  >
                    {i('EDIT')}
                  </Button>
                  <GenreDeleteButton genre={genre} />
                </Fragment>
              )}
              {editingData && <GenreImageForm genre={genre} />}
            </div>
            {!editingData ? (
              <Fragment>
                <div className="genre-detail-header">
                  <Headline1>{genre.name}</Headline1>
                  <Text>{genre.category}</Text>
                </div>
                <KinkScore value={genre.kinkiness} scale="genre" />
              </Fragment>
            ) : (
              <Fragment>
                <GenreDataForm
                  genre={genre}
                  submit={() => {
                    setEditingData(false);
                    return refetch();
                  }}
                  cancel={() => setEditingData(false)}
                />
              </Fragment>
            )}
            {(genre.validAsRoot || editingData) && (
              <AddSubgenreForm genre={genre} linkableChildren={genre.linkableChildren} />
            )}
          </Container>
        </Fragment>
      )}
    </BasePage>
  );
};
