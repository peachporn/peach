import { FunctionalComponent, h } from 'preact';
import { DataGridContainer, DataGridEntry } from '../../../components/dataGrid';
import { i } from '../../../i18n/i18n';
import { formatMeasurements } from '../../../../domain/actress/format';

export type ActressDataGridProps = {
  actress: Pick<
    Actress,
    | 'country'
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
  <DataGridContainer>
    <DataGridEntry label="ACTRESS_COUNTRY" value={actress.country} />
    <DataGridEntry label="ACTRESS_HAIRCOLOR" value={actress.haircolor} />
    <DataGridEntry label="ACTRESS_EYECOLOR" value={actress.eyecolor} />
    <DataGridEntry label="ACTRESS_ETHNICITY" value={actress.ethnicity} />
    <DataGridEntry
      label="ACTRESS_HEIGHT"
      value={actress.height ? `${actress.height}${i('ACTRESS_CM')}` : undefined}
    />
    <DataGridEntry
      label="ACTRESS_WEIGHT"
      value={actress.weight ? `${actress.weight}${i('ACTRESS_KG')}` : undefined}
    />
    <DataGridEntry
      label="ACTRESS_MEASUREMENTS"
      value={actress.measurements ? formatMeasurements(actress.measurements) : undefined}
    />
    <DataGridEntry label="ACTRESS_CUPSIZE" value={actress.cupsize} />
    <DataGridEntry label="ACTRESS_BOOBS" value={actress.boobs} />
    <DataGridEntry label="ACTRESS_PIERCINGS" value={actress.piercings} />
    <DataGridEntry label="ACTRESS_TATTOOS" value={actress.tattoos} />
  </DataGridContainer>
);
