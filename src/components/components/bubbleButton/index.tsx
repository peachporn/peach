import { FunctionalComponent, h } from 'preact';

export type BubbleButtonProps = {
  label: string;
  onClick: OnEvent;
};

export const BubbleButton: FunctionalComponent<BubbleButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} className="bubble-button">
    <span>{label}</span>
  </button>
);
