import { FunctionalComponent, h, VNode } from 'preact';

export type BubbleButtonProps = {
  label: string | VNode;
  onClick: OnEvent;
};

export const BubbleButton: FunctionalComponent<BubbleButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} className="bubble-button">
    {typeof label === 'string' ? <span>{label}</span> : label}
  </button>
);
