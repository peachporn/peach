import { adjust, prop, uniqBy } from 'ramda';
import { DefinableGenre, GenreDefinitionDraft } from './types';

export const addChildToGenreDefinition = (
  genreDefinition: GenreDefinitionDraft,
  child: DefinableGenre,
) => (genres: GenreDefinitionDraft[]) => {
  const indexToUpdate = genres.findIndex(g => g.timeStart === genreDefinition.timeStart);

  return indexToUpdate === undefined
    ? genres
    : adjust(
        indexToUpdate,
        l => ({
          ...l,
          genre: {
            ...l.genre,
            children: uniqBy(
              prop('id'),
              l.genre.parent.linkableChildren.find(c => c.id === child.id)
                ? [...l.genre.children, child]
                : l.genre.children,
            ),
          },
        }),
        genres,
      );
};

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
