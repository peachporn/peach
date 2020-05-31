import { FunctionComponent, h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

import MouseEventHandler = JSXInternal.MouseEventHandler;

type ButtonAppearance = 'main' | 'inverted';
type ButtonSize = 'default' | 'small' | 'wide';

export type ButtonProps = {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
