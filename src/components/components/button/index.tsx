import { FunctionComponent, h } from 'preact';

type ButtonAppearance = 'main' | 'inverted';
type ButtonSize = 'default' | 'small' | 'wide';

export type ButtonProps = {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  onClick?: (event: Event) => void;
  type?: 'button' | 'submit';
};

export const Button: FunctionComponent<ButtonProps> = ({
  appearance = 'main',
  size = 'default',
  onClick,
  type = 'button',
  children,
}) => (
  <button type={type} className={`btn btn--${appearance} btn--${size}`} onClick={onClick}>
    {children}
  </button>
);
