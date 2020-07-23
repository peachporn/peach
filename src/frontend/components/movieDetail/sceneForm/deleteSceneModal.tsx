import { h, FunctionalComponent } from 'preact';
import { Text } from '../../../../components/components/text';
import { Modal } from '../../../../components/components/modal';
import { i } from '../../../i18n/i18n';
import { Button } from '../../../../components/components/button';

type DeleteSceneModalProps = {
  closeModal: () => void;
  modalOpen: boolean;
  onDelete: () => void;
};

export const DeleteSceneModal: FunctionalComponent<DeleteSceneModalProps> = ({
  modalOpen,
  closeModal,
  onDelete,
}) => (
  <Modal appearance="tiny" visible={modalOpen} setVisible={closeModal}>
    <Text>{i('DELETE_SCENE_CONFIRM')}</Text>
    <Button
      onClick={e => {
        e.stopPropagation();
        onDelete();
        closeModal();
      }}
    >
      {i('YES_DELETE')}
    </Button>
    <Button
      appearance="inverted"
      onClick={e => {
        e.stopPropagation();
        closeModal();
      }}
    >
      {i('NO_KEEP')}
    </Button>
  </Modal>
);
