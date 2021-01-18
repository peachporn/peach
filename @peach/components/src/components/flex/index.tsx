import { FunctionComponent, h } from 'preact';

export type FlexProps = {
  justify?: 'center' | 'end' | 'space-between';
  column?: boolean;
};

export const Flex: FunctionComponent<FlexProps> = ({ column, justify, children }) => (
  <div className={`flex flex--${justify} ${column ? 'flex--column' : ''}`}>{children}</div>
);
