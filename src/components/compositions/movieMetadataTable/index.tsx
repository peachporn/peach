import { FunctionalComponent, h } from 'preact';
import { Table, TableCell, TableRow } from '../../components/table';
import { i } from '../../../frontend/i18n/i18n';

type DisplayableMovieMetadata = Pick<
  MovieMetadata,
  'sizeInMB' | 'quality' | 'format' | 'fps' | 'minutes' | 'seconds'
>;

export type MovieMetadataTableProps = {
  metadata: DisplayableMovieMetadata;
  volume: Pick<Volume, 'name'>;
  path: string;
};

const qualityString = (metadata: DisplayableMovieMetadata): string =>
  `${metadata.quality} ${metadata.format} ${metadata.fps}${i('METADATA_FPS')}`;

const durationString = (metadata: DisplayableMovieMetadata): string =>
  `${metadata.minutes} ${i('METADATA_MINUTES')} ${metadata.seconds} ${i('METADATA_SECONDS')}`;

export const MovieMetadataTable: FunctionalComponent<MovieMetadataTableProps> = ({
  metadata,
  volume,
  path,
}) => (
  <section className="movie-metadata-table">
    <Table>
      <TableRow>
        <TableCell>{i('METADATA_VIDEO')}</TableCell>
        <TableCell>{qualityString(metadata)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{i('METADATA_DURATION')}</TableCell>
        <TableCell>{durationString(metadata)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{i('METADATA_SIZE')}</TableCell>
        <TableCell>{`${metadata.sizeInMB} ${i('METADATA_MB')}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{i('METADATA_VOLUME')}</TableCell>
        <TableCell>{`${volume.name}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{i('METADATA_FILEPATH')}</TableCell>
        <TableCell>{`${path}`}</TableCell>
      </TableRow>
    </Table>
  </section>
);
