import { FunctionalComponent, h } from 'preact';

type TextSize = 'M' | 'L' | 'XL' | 'XXL';

export type TextProps = {
  size?: TextSize;
};

export const Text: FunctionalComponent<TextProps> = ({ size = 'M', children }) => (
  <span className={`text text--${size}`}>{children}</span>
);
