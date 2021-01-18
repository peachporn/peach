import { FunctionalComponent, h } from 'preact';
import { i } from '../../../frontend/i18n/i18n';
import { kinkinessRating, KinkScoreScale } from '../../../domain/genre/kinkiness';

export type KinkScoreProps = {
  value: number;
  scale: KinkScoreScale;
};

export const KinkScore: FunctionalComponent<KinkScoreProps> = ({ value, scale }) => (
  <div className="kink-score">
    <span className="kink-score__score">{value}</span>
    <span className="kink-score__label">{i(kinkinessRating(value, scale))}</span>
  </div>
);
