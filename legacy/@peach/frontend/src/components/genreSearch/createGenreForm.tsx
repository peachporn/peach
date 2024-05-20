import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { GenreForm, GenreFormValues } from '../genreForm';
import { useCreateGenre } from '../../hooks/useCreateGenre';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { i } from '../../i18n/i18n';

export type CreateGenreFormProps = {
  name: string;
  onSubmit: (genreId: number | undefined) => void;
  visibility?: [boolean, (x: boolean) => void];
};

export const CreateGenreForm: FunctionalComponent<CreateGenreFormProps> = ({
  onSubmit: onSubmitCallback,
  name,
  visibility,
}) => {
  const [visibleInternal, setVisibleInternal] = useState<boolean>(false);
  const [visibleExternal, setVisibleExternal] = visibility || [];

  const visible = visibleExternal !== undefined ? visibleExternal : visibleInternal;
  const setVisible = setVisibleExternal !== undefined ? setVisibleExternal : setVisibleInternal;

  const createGenre = useCreateGenre();

  const onSubmit = (data: GenreFormValues) =>
    createGenre(data).then(result => {
      setVisible(false);
      onSubmitCallback(result?.createGenre?.id);
    });

  return (
    <Fragment>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setVisible(true);
        }}
        className="w-full flex flex-col items-center text-center pt-8"
      >
        <Icon
          className="bg-gray-100 rounded-full p-2 mr-1 text-pink text-glow focus:outline-none active:bg-pink active:text-white transition-all"
          icon="add"
        />
        <span className="w-2/3 text-offBlack">{i('GENRE_FORM_NORESULT', { name })}</span>
      </div>
      <Modal visible={visible} setVisible={setVisible}>
        <GenreForm
          defaultValues={{ name }}
          onSubmit={onSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Fragment>
  );
};
