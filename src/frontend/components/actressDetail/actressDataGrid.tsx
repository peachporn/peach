import { FunctionalComponent, h } from 'preact';
import { formatMeasurements } from '../../../domain/actress/format';
import {
  ActressDataGridContainer,
  ActressDataGridEntry,
} from '../../../components/compositions/actressDataGrid';
import { i } from '../../i18n/i18n';

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

export const ActressDataGrid: FunctionalComponent<ActressDataGridProps> = ({ actress }) => (
  <ActressDataGridContainer>
    <ActressDataGridEntry label="ACTRESS_HAIRCOLOR" value={actress.haircolor} />
    <ActressDataGridEntry label="ACTRESS_EYECOLOR" value={actress.eyecolor} />
    <ActressDataGridEntry label="ACTRESS_ETHNICITY" value={actress.ethnicity} />
    <ActressDataGridEntry
      label="ACTRESS_HEIGHT"
      value={actress.height ? `${actress.height}${i('ACTRESS_CM')}` : undefined}
    />
    <ActressDataGridEntry
      label="ACTRESS_WEIGHT"
      value={actress.weight ? `${actress.weight}${i('ACTRESS_KG')}` : undefined}
    />
    <ActressDataGridEntry
      label="ACTRESS_MEASUREMENTS"
      value={actress.measurements ? formatMeasurements(actress.measurements) : undefined}
    />
    <ActressDataGridEntry label="ACTRESS_CUPSIZE" value={actress.cupsize} />
    <ActressDataGridEntry label="ACTRESS_BOOBS" value={actress.boobs} />
    <ActressDataGridEntry label="ACTRESS_PIERCINGS" value={actress.piercings} />
    <ActressDataGridEntry label="ACTRESS_TATTOOS" value={actress.tattoos} />
  </ActressDataGridContainer>
);
