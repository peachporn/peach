import { FunctionalComponent, h } from 'preact';
import { MovieMetadata, Quality, Volume } from '@peach/types';
import { i } from '../../../i18n/i18n';

type DisplayableMovieMetadata = Pick<
  MovieMetadata,
  'sizeInMB' | 'quality' | 'format' | 'fps' | 'minutes' | 'seconds'
>;

export type MetadataTableProps = {
  metadata: DisplayableMovieMetadata;
  volume: Pick<Volume, 'name'>;
  path: string;
};

const quality = (q: Quality) =>
  ({
    SD: 'SD',
    HD: '720p',
    FullHD: '1080p',
    UHD: '4K',
  }[q]);

const qualityString = (metadata: DisplayableMovieMetadata): string =>
  `${quality(metadata.quality)} ${metadata.format} ${metadata.fps}${i('METADATA_FPS')}`;

const durationString = (metadata: DisplayableMovieMetadata): string =>
  `${metadata.minutes} ${i('METADATA_MINUTES')} ${metadata.seconds} ${i('METADATA_SECONDS')}`;

export const MetadataTable: FunctionalComponent<MetadataTableProps> = ({
  metadata,
  volume,
  path,
}) => (
  <section className="movie-metadata-table">
    <h2 className="text-xl pb-2">{i('MOVIE_METADATA')}</h2>
    <span className="block">{qualityString(metadata)}</span>
    <span className="block">{durationString(metadata)}</span>
    <span className="block">{`${metadata.sizeInMB} ${i('METADATA_MB')}`}</span>
    <span className="block">{`${volume.name}/${path}`}</span>
  </section>
);
