import { h, FunctionalComponent } from 'preact';
import { Icon } from './icon';

type ModalProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

export const Modal: FunctionalComponent<ModalProps> = ({ visible, setVisible, children }) =>
  !visible ? null : (
    <div className="fixed inset-0 w-full h-full bg-white p-8 animate-fadeSlide">
      <button className="absolute top-8 right-8" onClick={() => setVisible(false)}>
        <Icon icon="clear" />
      </button>
      <div>{children}</div>
    </div>
  );
