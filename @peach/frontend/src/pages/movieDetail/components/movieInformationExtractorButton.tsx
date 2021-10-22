import { FunctionalComponent, h } from 'preact';
import { Icon } from '../../../components/icon';
import { ActressSearch } from '../../../components/actressSearch';
import { WebsiteSearch } from '../../../components/websiteSearch';

export type MovieInformationExtractionResult = {
  title?: string;
  actresses: number[];
  website: number | undefined;
};

type MovieInformationExtractorButtonProps = {
  extractMovieInformation: () => void;
};

export const MovieInformationExtractorButton: FunctionalComponent<MovieInformationExtractorButtonProps> =
  ({ extractMovieInformation }) => (
    <button className="mr-2" onClick={extractMovieInformation}>
      <Icon
        className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1 focus:outline-none active:bg-pink active:text-white transition-all"
        icon="find_replace"
      />
    </button>
  );
