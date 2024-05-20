import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { WebsiteForm, WebsiteFormValues } from '../../../components/websiteForm';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { useCreateWebsite } from '../../../hooks/useCreateWebsite';

export type CreateWebsiteFloatingButtonProps = {
  onSubmit: () => void;
};

export const CreateWebsiteFloatingButton: FunctionalComponent<CreateWebsiteFloatingButtonProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);
  const createWebsite = useCreateWebsite();

  const onSubmit = (data: WebsiteFormValues) =>
    createWebsite(data).then(() => {
      setFormVisible(false);
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
      <Modal visible={formVisible} setVisible={setFormVisible}>
        <WebsiteForm onSubmit={onSubmit} />
      </Modal>
    </Fragment>
  );
};
