import { FunctionComponent, h } from 'preact';

type ButtonType = 'main' | 'inverted';
type ButtonSize = 'default' | 'small' | 'wide';

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
};

export const Button: FunctionComponent<ButtonProps> = ({
  type = 'main',
  size = 'default',
  children,
}) => (
  <button type="button" className={`btn btn--${type} btn--${size}`}>
    {children}
  </button>
);
