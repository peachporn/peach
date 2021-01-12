import { Genre as DBGenre, Prisma } from '@prisma/client';

const categoryMap: { [key: string]: GenreCategory } = {
  Position: 'Position',
  Location: 'Location',
  Clothing: 'Clothing',
  Practice: 'Practice',
  Film: 'Film',
  Feature: 'Feature',
  BodyPart: 'BodyPart',
};

export const transformBaseGenre = (genre: DBGenre): Genre => ({
  id: genre.id,
  name: genre.name,
  category: categoryMap[genre.category],
  kinkiness: genre.kinkiness,
  validAsRoot: genre.validAsRoot,
  validAsFetish: genre.validAsFetish,
  picture: '',
  linkableParents: [],
  linkableChildren: [],
});

export const transformGenre = (
  genre: Prisma.GenreGetPayload<{ include: { linkableChildren: true; linkableParents: true } }>,
): Genre => ({
  ...transformBaseGenre(genre),
  linkableParents: genre.linkableParents.map(transformBaseGenre),
  linkableChildren: genre.linkableChildren.map(transformBaseGenre),
});
