import { FunctionalComponent, h } from 'preact';
import { head, init, last } from 'ramda';
import { ExtractedMovieInformationFragment, MovieDetailFragment } from '@peach/types';
import { Icon } from '../../../components/icon';
import { ActressSearch } from '../../../components/actressSearch';
import { WebsiteSearch } from '../../../components/websiteSearch';

type MovieInformationExtractorProps = {
  movie: MovieDetailFragment;
  extractionFetchResult: ExtractedMovieInformationFragment | undefined;
  clipboard: string;
  setClipboard: (s: string) => void;
  setActressSearchName: (s: string) => void;
  setWebsiteSearchName: (s: string) => void;
  setTitle: (s: string) => void;
};

export const MovieInformationExtractor: FunctionalComponent<MovieInformationExtractorProps> = ({
  movie,
  clipboard,
  setClipboard,
  setActressSearchName,
  setWebsiteSearchName,
  setTitle,
  extractionFetchResult,
}) => {
  const addToClipboard = (s: string) => () => {
    if (clipboard.includes(s)) {
      const start = clipboard.indexOf(s);
      const withoutToken = `${clipboard.slice(0, start)}${clipboard.slice(
        start + s.length,
        clipboard.length,
      )}`;
      setClipboard(withoutToken.trim());
    } else {
      setClipboard(`${clipboard} ${s}`.trim());
    }
  };

  const containingFolder = last(init(movie?.path.split('/')));

  return extractionFetchResult === undefined ? null : (
    <div className="pb-4">
      <div className="pt-6">
        {containingFolder && (
          <div className="flex w-full h-full items-center gap-2 text-sm">
            <button
              onClick={addToClipboard(containingFolder)}
              className={`rounded px-2 py-1 ${
                clipboard.includes(containingFolder) ? 'bg-pink text-white' : ''
              }`}
            >
              {containingFolder}
            </button>
          </div>
        )}
        <div className="flex w-full h-full items-center gap-2 text-sm">
          {extractionFetchResult?.tokens.map(t => (
            <button
              onClick={addToClipboard(t.token)}
              className={`rounded px-2 py-1 ${t.detection ? 'text-gray-200' : ''}${
                clipboard.includes(t.token) ? 'bg-pink text-white' : ''
              }`}
            >
              {t.token}
            </button>
          ))}
        </div>
      </div>
      <div className={clipboard ? 'mt-2 flex gap-2 items-center' : 'hidden'}>
        <button
          onClick={() => {
            setActressSearchName(clipboard);
            setClipboard('');
          }}
        >
          <Icon
            className="bg-gray-100 rounded-full p-2 text-pink text-glow focus:outline-none active:bg-pink active:text-white transition-all"
            icon="person_pin"
          />
        </button>
        <button
          onClick={() => {
            setWebsiteSearchName(clipboard);
            setClipboard('');
          }}
        >
          <Icon
            className="bg-gray-100 rounded-full p-2 text-pink text-glow focus:outline-none active:bg-pink active:text-white transition-all"
            icon="language"
          />
        </button>
        <button
          onClick={() => {
            setTitle(clipboard);
            setClipboard('');
          }}
        >
          <Icon
            className="bg-gray-100 rounded-full p-2 text-pink text-glow focus:outline-none active:bg-pink active:text-white transition-all"
            icon="movie"
          />
        </button>
        <span className="text-xl">{clipboard}</span>
      </div>
    </div>
  );
};
