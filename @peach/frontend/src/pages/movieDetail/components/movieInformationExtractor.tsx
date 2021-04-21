import { FunctionalComponent, h } from 'preact';
import { head } from 'ramda';
import { ExtractedMovieInformationFragment } from '@peach/types';
import { Icon } from '../../../components/icon';
import { ActressSearch } from '../../../components/actressSearch';
import { WebsiteSearch } from '../../../components/websiteSearch';

type MovieInformationExtractorProps = {
  extractionFetchResult: ExtractedMovieInformationFragment | undefined;
  clipboard: string;
  setClipboard: (s: string) => void;
  setActressSearchName: (s: string) => void;
  setWebsiteSearchName: (s: string) => void;
};

export const MovieInformationExtractor: FunctionalComponent<MovieInformationExtractorProps> = ({
  clipboard,
  setClipboard,
  setActressSearchName,
  setWebsiteSearchName,
  extractionFetchResult,
}) =>
  extractionFetchResult === undefined ? null : (
    <div className="pb-4">
      <div className="flex w-full h-full items-center gap-2 text-sm pt-6">
        {extractionFetchResult?.tokens.map(t => (
          <button
            onClick={() => {
              if (clipboard.includes(t.token)) {
                const start = clipboard.indexOf(t.token);
                const withoutToken = `${clipboard.slice(0, start)}${clipboard.slice(
                  start + t.token.length,
                  clipboard.length,
                )}`;
                setClipboard(withoutToken.trim());
              } else {
                setClipboard(`${clipboard} ${t.token}`.trim());
              }
            }}
            className={`rounded px-2 py-1 ${t.detection ? 'text-gray-200' : ''}${
              clipboard.includes(t.token) ? 'bg-pink text-white' : ''
            }`}
          >
            {t.token}
          </button>
        ))}
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
        <span className="text-xl">{clipboard}</span>
      </div>
    </div>
  );
