import { FunctionalComponent, h } from 'preact';

type NoResultProps = {
  message: string;
};

export const NoResult: FunctionalComponent<NoResultProps> = ({ message }) => (
  <span className="no-result">{message}</span>
);
