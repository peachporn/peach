import { FunctionalComponent, h } from 'preact';
import { Icon } from '../icon';

export type ModalProps = {
  visible: boolean;
  setVisible: (x: boolean) => void;
  appearance?: 'default' | 'slit';
};

export const Modal: FunctionalComponent<ModalProps> = ({
  visible,
  setVisible,
  appearance = 'default',
  children,
}) =>
  !visible ? null : (
    <div className={`modal modal--${appearance}`}>
      <button onClick={() => setVisible(false)} className="modal__close">
        <Icon icon="close" />
      </button>
      {children}
    </div>
  );
