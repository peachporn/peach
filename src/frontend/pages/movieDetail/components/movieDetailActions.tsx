import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { homeRoute } from '../../../utils/route';
import { Button, Flex, Headline2 } from '../../../../components';
import { deleteMovieMutation } from '../mutations/deleteMovie.gql';
import { i } from '../../../i18n/i18n';
import { Modal } from '../../../../components/components/modal';
import { Text } from '../../../../components/components/text';

export type MovieDetailActionsProps = {
  movie: Pick<Movie, 'id'>;
};

export const MovieDetailActions: FunctionalComponent<MovieDetailActionsProps> = ({ movie }) => {
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
        <Text>{i('CONFIRM_DELETE_MOVIE')}</Text>
        <Flex justify="center">
          <Button
            onClick={() => {
              deleteMovie().then(() => {
                toast.success(i('DELETE_MOVIE_SUCCESS'));
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
