import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { GenreSearch } from '../../../components/genreSearch';
import { GenreForm, GenreFormValues } from '../../../components/genreForm';
import { useCreateGenre } from '../../../hooks/useCreateGenre';

type CreateGenreFloatingButtonProps = {
  onSubmit: () => void;
};

export const CreateGenreFloatingButton: FunctionalComponent<CreateGenreFloatingButtonProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const createGenre = useCreateGenre();

  const onSubmit = (data: GenreFormValues) =>
    createGenre(data).then(() => {
      setVisible(false);
      onSubmitCallback();
    });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={open}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <GenreForm onSubmit={onSubmit} />
      </Modal>
    </Fragment>
  );
};
