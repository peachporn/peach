import { FunctionalComponent, h } from 'preact';
import { Icon } from '../icon';

export type ModalProps = {
  visible: boolean;
  setVisible: (x: boolean) => void;
};

export const Modal: FunctionalComponent<ModalProps> = ({ visible, setVisible, children }) =>
  !visible ? null : (
    <div className="modal">
      <button onClick={() => setVisible(false)} className="modal__close">
        <Icon icon="close" />
      </button>
      {children}
    </div>
  );
