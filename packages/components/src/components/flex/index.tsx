import { FunctionComponent, h } from 'preact';

export type FlexProps = {
  justify: 'center' | 'end' | 'space-between';
};

export const Flex: FunctionComponent<FlexProps> = ({ justify, children }) => (
  <div className={`flex flex--${justify}`}>{children}</div>
);
