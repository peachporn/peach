import { adjust } from 'ramda';
import { GenreDefinitionDraft } from './types';

export const removeChildFromGenreDefinition = (
  genreDefinition: GenreDefinitionDraft,
  childId: number,
) => (genres: GenreDefinitionDraft[]) => {
  const indexToUpdate = genres.findIndex(g => g.timeStart === genreDefinition.timeStart);

  return indexToUpdate === undefined
    ? genres
    : adjust(
        indexToUpdate,
        l => ({ ...l, children: l.genre.children.filter(c => c.id !== childId) }),
        genres,
      );
};
