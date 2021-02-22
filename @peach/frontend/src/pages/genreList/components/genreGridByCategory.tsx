import { FunctionalComponent, h } from 'preact';
import { GenreCardFragment } from '@peach/types';
import { useHistory } from 'react-router-dom';
import { genreCategories } from '../../../domain/genre';
import { GenreCard } from '../../../components/genreCard';
import { genreDetailRoute } from '../../../utils/route';

type GenreGridByCategoryProps = {
  genres: GenreCardFragment[];
};

export const GenreGridByCategory: FunctionalComponent<GenreGridByCategoryProps> = ({ genres }) => {
  const history = useHistory();

  return (
    <div className="grid gap-3">
      {genreCategories.map(c => {
        const genresForCategory = genres.filter(g => g.category === c);

        return genresForCategory?.length ? (
          <div>
            <h2 className="text-lg border-b border-gray-200 mb-3">{c}</h2>
            <div className="grid grid-cols-3 md:grid-cols-10 gap-2">
              {genresForCategory.map(g => (
                <GenreCard
                  key={g.id}
                  genre={g}
                  onClick={() => {
                    history.push(genreDetailRoute(g.id));
                  }}
                />
              ))}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};
