import { FunctionalComponent, h } from 'preact';
import { GenreCardFragment } from '@peach/types';
import { genreCategories } from '../../../domain/genre';
import { GenreCard } from '../../../components/genreCard';

type GenreGridByCategoryProps = {
  genres: GenreCardFragment[];
};

export const GenreGridByCategory: FunctionalComponent<GenreGridByCategoryProps> = ({ genres }) => (
  <div className="grid gap-3">
    {genreCategories.map(c => {
      const genresForCategory = genres.filter(g => g.category === c);

      return genresForCategory?.length ? (
        <div>
          <h2 className="text-lg">{c}</h2>
          <div className="grid grid-cols-3 gap-2">
            {genresForCategory.map(g => (
              <GenreCard genre={g} />
            ))}
          </div>
        </div>
      ) : null;
    })}
  </div>
);
