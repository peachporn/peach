import { FunctionalComponent, h } from 'preact';
import { Icon } from '../icon';

export type ModalProps = {
  visible: boolean;
  setVisible: (x: boolean) => void;
  appearance?: 'default' | 'slit' | 'tiny';
};

export const Modal: FunctionalComponent<ModalProps> = ({
  visible,
  setVisible,
  appearance = 'default',
  children,
}) =>
  !visible ? null : (
    <div className={`modal modal--${appearance}`}>
      {children}
      <button onClick={() => setVisible(false)} className="modal__close">
        <Icon icon="close" />
      </button>
    </div>
  );
