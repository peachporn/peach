import { GenreCategory } from '@peach/types';
import { FunctionalComponent, h } from 'preact';
import { PropRef, useEffect, useState } from 'preact/hooks';
import { i, I18nKey } from '../../../../../i18n/i18n';
import { MovieHighlightForm } from '../../../hooks/useMovieHighlightForm';
import { buildGenreGrid, DisplayableGenre } from '../display';
import { GenreFormClipProps } from '../genreFormClip';
import { GenreDefinitionDraft } from '../types';

type GenreGridProps = {
  genreDefinitions: GenreDefinitionDraft[];
  setGenreDefinitions: (genreDefinitions: GenreDefinitionDraft[]) => void;
  video: PropRef<HTMLVideoElement | undefined>;
  focusedGenre: GenreDefinitionDraft | null;
  focusGenre: (g: GenreDefinitionDraft | null) => void;
  form: MovieHighlightForm;

  ClipComponent: FunctionalComponent<GenreFormClipProps>;
};

const categories: GenreCategory[] = [
  'Practice',
  'Position',
  'Location',
  'Clothing',
  'Film',
  'Feature',
];

export const GenreGrid: FunctionalComponent<GenreGridProps> = ({
  genreDefinitions,
  setGenreDefinitions,
  video,
  focusGenre,
  focusedGenre,
  form,
  ClipComponent,
}) => {
  const [duration, setDuration] = useState(1);
  useEffect(() => {
    if (!video.current?.duration) return;
    setDuration(video.current.duration);
  }, [video.current?.duration]);

  const [genreGrid, setGenreGrid] = useState<Record<GenreCategory, DisplayableGenre[]>>(
    Object.fromEntries<DisplayableGenre[]>(categories.map(c => [c, []])) as Record<
      GenreCategory,
      DisplayableGenre[]
    >,
  );

  useEffect(() => {
    setGenreGrid(
      Object.fromEntries<DisplayableGenre[]>(
        categories.map(c => [
          c,
          buildGenreGrid(
            duration,
            genreDefinitions.filter(g => (!c ? true : g.genre.parent.category === c)),
          ),
        ]),
      ) as Record<GenreCategory, DisplayableGenre[]>,
    );
  }, [duration]);

  return (
    <div className="bg-white grid w-full max-w-screen-xl mx-auto overflow-x-auto gap-4 -mb-0.5 p-2">
      {categories.map(
        category =>
          genreDefinitions.filter(g => g.genre.parent.category === category).length > 0 && (
            <span className="flex relative h-full h-14">
              <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-200 pr-2">
                {i(`GENRE_CATEGORY_${category.toUpperCase()}` as I18nKey)}
              </span>
              <div className="grid grid-cols-100 relative grid-flow-row-dense w-full gap-y-4">
                <span className="absolute w-full h-1/2 top-0 z-0 border-b border-dashed border-gray-200" />
                {genreGrid[category].map(g => (
                  <ClipComponent
                    genreDefinition={g}
                    genreDefinitions={genreDefinitions}
                    setGenreDefinitions={setGenreDefinitions}
                    video={video}
                    form={form}
                    focusedGenre={focusedGenre}
                    focusGenre={focusGenre}
                  />
                ))}
              </div>
            </span>
          ),
      )}
    </div>
  );
};
