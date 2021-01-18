import { FunctionalComponent, h, VNode } from 'preact';

type NoResultProps = {
  message: string;
  interactionSlot?: VNode;
};

export const NoResult: FunctionalComponent<NoResultProps> = ({ message, interactionSlot }) => (
  <div className="no-result">
    {message}
    <div className="no-result__interaction">{interactionSlot}</div>
  </div>
);
