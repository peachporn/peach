import { useMutation } from '@apollo/client';
import {
  ConvertMovieMutation,
  ConvertMovieMutationVariables,
  DeleteMovieMutation,
  DeleteMovieMutationVariables,
} from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../../components/modal';
import { i } from '../../../i18n/i18n';
import { convertMovieMutation } from '../mutations/convertMovie.gql';
import { deleteMovieMutation } from '../mutations/deleteMovie.gql';

export type DangerZoneProps = {
  movieId: number;
  className?: string;
};

export const DangerZone: FunctionalComponent<DangerZoneProps> = ({ movieId, className }) => {
  const history = useHistory();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  const [deleteMovie] = useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(
    deleteMovieMutation,
    {
      variables: {
        movieId,
      },
    },
  );

  const [convertMovie] = useMutation<ConvertMovieMutation, ConvertMovieMutationVariables>(
    convertMovieMutation,
    {
      variables: {
        movieId,
      },
    },
  );

  const submitDelete = () => {
    deleteMovie().then(() => {
      setDeleteConfirmationVisible(false);
      history.goBack();
    });
  };

  const submitConvert = () => {
    convertMovie().then(() => {
      alert('Conversion started!');
    });
  };

  return (
    <Fragment>
      <Modal visible={deleteConfirmationVisible} setVisible={setDeleteConfirmationVisible}>
        <section className="mx-auto max-w-screen-md">
          <h2 className="text-xl mb-2">{i('MOVIE_DELETE_CONFIRM')}</h2>
          <div className="flex gap-2">
            <button className="bg-gray-200 text-white rounded p-2" onClick={submitDelete}>
              {i('YES_DELETE')}
            </button>
            <button
              className="bg-pink text-white rounded p-2"
              onClick={() => setDeleteConfirmationVisible(false)}
            >
              {i('NO_KEEP')}
            </button>
          </div>
        </section>
      </Modal>
      <section className={`break-all ${className} py-4`}>
        <h2 className="text-xl pb-2">{i('MOVIE_DANGERZONE')}</h2>
        <button
          className="bg-pink text-white rounded p-2"
          onClick={() => setDeleteConfirmationVisible(true)}
        >
          {i('MOVIE_DELETE')}
        </button>
        <button className="bg-pink text-white rounded p-2 ml-2" onClick={submitConvert}>
          {i('MOVIE_CONVERT')}
        </button>
      </section>
    </Fragment>
  );
};
