import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { BubbleButton } from '../../../components/components/bubbleButton';
import { Modal } from '../../../components/components/modal';

export type AddActressFormProps = {
  movie: Pick<Movie, 'id'>;
};

export const AddActressForm: FunctionalComponent<AddActressFormProps> = ({ movie }) => {
  const [formVisible, setFormVisible] = useState(false);

  const open = () => setFormVisible(true);

  return (
    <Fragment>
      <BubbleButton label="+" onClick={open} />
      <Modal visible={formVisible} setVisible={setFormVisible}>
        ADD_ACTRESS
      </Modal>
    </Fragment>
  );
};
