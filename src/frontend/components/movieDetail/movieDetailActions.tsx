import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isTouched } from '../../utils/form';
import { Headline2 } from '../../../components/components/headline';
import { i } from '../../i18n/i18n';
import { Button } from '../../../components/components/button';
import { Modal } from '../../../components/components/modal';
import { Text } from '../../../components/components/text';
import { Flex } from '../../../components/components/flex';
import { deleteMovieMutation } from '../../mutations/deleteMovie.gql';
import { homeRoute } from '../../utils/route';

export type MovieDetailDangerZoneProps = {
  movie: Pick<Movie, 'id'>;
};

export const MovieDetailActions: FunctionalComponent<MovieDetailDangerZoneProps> = ({ movie }) => {
  const history = useHistory();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteMovie] = useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(
    deleteMovieMutation,
    {
      variables: {
        movieId: movie.id,
      },
    },
  );

  return (
    <section className="movie-detail-actions">
      <Modal appearance="tiny" visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
        <Headline2>{i('CONFIRM_DELETE_HEADLINE')}</Headline2>
        <Text>{i('CONFIRM_DELETE')}</Text>
        <Flex justify="center">
          <Button
            onClick={() => {
              deleteMovie().then(() => {
                toast.success(i('DELETE_SUCCESS'));
                history.replace(homeRoute);
              });
            }}
          >
            {i('YES_DELETE')}
          </Button>
          <Button
            appearance="inverted"
            onClick={() => {
              setDeleteModalVisible(false);
            }}
          >
            {i('NO_KEEP')}
          </Button>
        </Flex>
      </Modal>
      <Headline2>{i('ACTIONS')}</Headline2>
      <Button
        appearance="inverted"
        onClick={() => {
          setDeleteModalVisible(true);
        }}
      >
        {i('DELETE')}
      </Button>
    </section>
  );
};
