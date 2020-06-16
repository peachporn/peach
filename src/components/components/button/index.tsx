import { FunctionComponent, h } from 'preact';

type ButtonAppearance = 'main' | 'inverted';
type ButtonSize = 'default' | 'small' | 'wide';

export type ButtonProps = {
  appearance?: ButtonAppearance;
  tabIndex?: number;
  size?: ButtonSize;
  onClick?: EventHandler;
  type?: 'button' | 'submit';
};

export const Button: FunctionComponent<ButtonProps> = ({
  appearance = 'main',
  size = 'default',
  onClick,
  type = 'button',
  tabIndex,
  children,
}) => (
  <button
    tabIndex={tabIndex}
    type={type}
    className={`btn btn--${appearance} btn--${size}`}
    onClick={onClick}
  >
    {children}
  </button>
);
