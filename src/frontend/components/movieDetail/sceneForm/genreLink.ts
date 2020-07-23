import { adjust, prop, uniqBy } from 'ramda';
import { GenreLink, SceneGenre } from './types';

export const addChildToGenreLink = (parentId: number, child: SceneGenre) => (
  genreLinks: GenreLink[],
) => {
  const indexToUpdate = genreLinks.findIndex(g => g.parent.id === parentId);

  return indexToUpdate === undefined
    ? genreLinks
    : adjust(
        indexToUpdate,
        l => ({
          ...l,
          children: uniqBy(
            prop('id'),
            l.parent.linkableChildren.find(c => c.id === child.id)
              ? [...l.children, child]
              : l.children,
          ),
        }),
        genreLinks,
      );
};

export const removeChildFromGenreLink = (parentId: number, childId: number) => (
  genreLinks: GenreLink[],
) => {
  const indexToUpdate = genreLinks.findIndex(g => g.parent.id === parentId);

  return indexToUpdate === undefined
    ? genreLinks
    : adjust(
        indexToUpdate,
        l => ({ ...l, children: l.children.filter(c => c.id !== childId) }),
        genreLinks,
      );
};
