import { FunctionalComponent, h } from 'preact';
import { i, I18nKey } from '../../../frontend/i18n/i18n';
import { formatMeasurements } from '../../../domain/actress/format';

export type ActressDataGridProps = {
  actress: Pick<
    Actress,
    | 'cupsize'
    | 'haircolor'
    | 'eyecolor'
    | 'ethnicity'
    | 'boobs'
    | 'piercings'
    | 'tattoos'
    | 'height'
    | 'weight'
    | 'measurements'
  >;
};

type GridEntryProps = {
  value?: string;
  label: I18nKey;
  wide?: boolean;
};

const GridEntry: FunctionalComponent<GridEntryProps> = ({ value, label, wide }) =>
  !value ? null : (
    <div
      className={`actress-data-grid__entry ${wide ? 'actress-data-grid__entry--wide' : ''}`.trim()}
    >
      <dt className="actress-data-grid__label">{i(label)}</dt>
      <dd className="actress-data-grid__value">{value}</dd>
    </div>
  );

export const ActressDataGrid: FunctionalComponent<ActressDataGridProps> = ({ actress }) => (
  <dl className="actress-data-grid">
    <GridEntry label="ACTRESS_HAIRCOLOR" value={actress.haircolor} />
    <GridEntry
      label="ACTRESS_HEIGHT"
      value={actress.height ? `${actress.height}${i('ACTRESS_CM')}` : undefined}
    />
    <GridEntry label="ACTRESS_BOOBS" value={actress.boobs} />
    <GridEntry label="ACTRESS_EYECOLOR" value={actress.eyecolor} />
    <GridEntry
      label="ACTRESS_WEIGHT"
      value={actress.weight ? `${actress.weight}${i('ACTRESS_KG')}` : undefined}
    />
    <GridEntry
      label="ACTRESS_MEASUREMENTS"
      value={actress.measurements ? formatMeasurements(actress.measurements) : undefined}
    />
    <GridEntry label="ACTRESS_ETHNICITY" value={actress.ethnicity} />
    <GridEntry label="ACTRESS_CUPSIZE" value={actress.cupsize} />
    <GridEntry wide label="ACTRESS_PIERCINGS" value={actress.piercings} />
    <GridEntry wide label="ACTRESS_TATTOOS" value={actress.tattoos} />
  </dl>
);
