import { Genre as DBGenre, GenreGetPayload } from '@prisma/client';

const categoryMap: { [key: string]: GenreCategory } = {
  Position: 'Position',
  Location: 'Location',
  Clothing: 'Clothing',
  Practice: 'Practice',
  Film: 'Film',
  Feature: 'Feature',
  BodyPart: 'BodyPart',
};

const transformBaseGenre = (genre: DBGenre): Genre => ({
  id: genre.id,
  name: genre.name,
  category: categoryMap[genre.category],
  kinkiness: genre.kinkiness,
  validAsRoot: genre.validAsRoot,
  linkableParents: [],
});

export const transformGenre = (
  genre: GenreGetPayload<{ include: { linkableParents: true } }>,
): Genre => ({
  ...transformBaseGenre(genre),
  linkableParents: genre.linkableParents.map(transformBaseGenre),
});
