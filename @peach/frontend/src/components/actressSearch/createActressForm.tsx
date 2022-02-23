import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { ActressFormValues } from '../../domain/actress/types/actressFormValues';
import { useCreateActress } from '../../hooks/useCreateActress';
import { i } from '../../i18n/i18n';
import { ActressForm } from '../actressForm';
import { Icon } from '../icon';
import { Modal } from '../modal';

export type CreateActressFormProps = {
  name: string;
  onSubmit: (actressId: number | undefined) => void;
  visibility?: [boolean, (x: boolean) => void];
};

export const CreateActressForm: FunctionalComponent<CreateActressFormProps> = ({
  onSubmit: onSubmitCallback,
  name,
  visibility,
}) => {
  const [visibleInternal, setVisibleInternal] = useState<boolean>(false);
  const [visibleExternal, setVisibleExternal] = visibility || [];

  const visible = visibleExternal !== undefined ? visibleExternal : visibleInternal;
  const setVisible = setVisibleExternal !== undefined ? setVisibleExternal : setVisibleInternal;

  const createActress = useCreateActress();

  const onSubmit = (data: ActressFormValues) =>
    createActress(data).then(result => {
      setVisible(false);
      onSubmitCallback(result?.createActress?.id);
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
        <span className="w-2/3 text-offBlack">{i('ACTRESS_FORM_NORESULT', { name })}</span>
      </div>
      <Modal visible={visible} setVisible={setVisible}>
        <ActressForm
          defaultSearchName={name}
          onSubmit={onSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Fragment>
  );
};
