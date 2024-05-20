import { ActressDetailFragment } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { ActressForm } from '../../../components/actressForm';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { actressDetailFragmentToFormValues } from '../../../domain/actress/conversions/detailFragmentToFormValues';
import { useUpdateActress } from '../hooks/useUpdateActress';

type EditActressFormProps = {
  actress: ActressDetailFragment;
  onSubmit: () => void;
};

export const EditActressForm: FunctionalComponent<EditActressFormProps> = ({
  actress,
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const onSubmit = useUpdateActress(actress, () => {
    setVisible(false);
    onSubmitCallback();
  });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={open}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="edit" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <ActressForm
          defaultValues={actressDetailFragmentToFormValues(actress)}
          onSubmit={onSubmit}
        />
      </Modal>
    </Fragment>
  );
};
