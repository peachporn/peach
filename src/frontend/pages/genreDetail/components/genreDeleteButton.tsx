import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { homeRoute } from '../../../utils/route';
import { Button, Flex, Headline2 } from '../../../../components';
import { Text } from '../../../../components/components/text';
import { deleteGenreMutation } from '../mutations/deleteGenre.gql';
import { i } from '../../../i18n/i18n';
import { Modal } from '../../../../components/components/modal';

export type GenreDeleteButtonProps = {
  genre: Pick<Genre, 'id'>;
};

export const GenreDeleteButton: FunctionalComponent<GenreDeleteButtonProps> = ({ genre }) => {
  const history = useHistory();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteGenre] = useMutation<DeleteGenreMutation, DeleteGenreMutationVariables>(
    deleteGenreMutation,
    {
      variables: {
        genreId: genre.id,
      },
    },
  );

  return (
    <Fragment>
      <Modal appearance="tiny" visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
        <Headline2>{i('CONFIRM_DELETE_HEADLINE')}</Headline2>
        <Text>{i('CONFIRM_DELETE_GENRE')}</Text>
        <Flex justify="center">
          <Button
            onClick={() => {
              deleteGenre().then(() => {
                toast.success(i('DELETE_GENRE_SUCCESS'));
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
      <Button
        appearance="inverted"
        onClick={() => {
          setDeleteModalVisible(true);
        }}
      >
        {i('DELETE')}
      </Button>
    </Fragment>
  );
};
