import { FunctionalComponent, h } from 'preact';

export type LoadingProps = {
  color: 'peach' | 'white';
};

export const Loading: FunctionalComponent<LoadingProps> = ({ color }) => (
  <i className={`spinner spinner--${color}`} />
);
