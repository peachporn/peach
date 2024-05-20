import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { ActressForm } from '../../../components/actressForm';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { ActressFormValues } from '../../../domain/actress/types/actressFormValues';
import { useCreateActress } from '../../../hooks/useCreateActress';

export type CreateActressFloatingButtonProps = {
  onSubmit: () => void;
};

export const CreateActressFloatingButton: FunctionalComponent<CreateActressFloatingButtonProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const createActress = useCreateActress();

  const onSubmit = (data: ActressFormValues) =>
    createActress(data).then(() => {
      setVisible(false);
      onSubmitCallback();
    });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={() => setVisible(true)}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <ActressForm
          defaultManual={true}
          onSubmit={onSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Fragment>
  );
};
