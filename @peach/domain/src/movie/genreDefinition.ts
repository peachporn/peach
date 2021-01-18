import { Genre } from "@peach/types";

export type GenreLinkRaw = {
  parent: number;
  children: number[];
};

export type GenreLink = {
  parent: Genre;
  children: Genre[];
};

export const genreIdsForGenreLink = (genreLink: GenreLinkRaw) => [
  genreLink.parent,
  ...(genreLink.children || []),
];

const genreById = (genres: Genre[]) => (genreId: number) => genres.find(g => g.id === genreId);

export const resolveGenreLink = (genres: Genre[]) => (genreLink: GenreLinkRaw) => {
  const parent = genreById(genres)(genreLink.parent);

  if (!parent) {
    return undefined;
  }
  return {
    parent,
    children: genreLink.children.map(genreById(genres)).filter(g => g !== undefined) as Genre[],
  };
};
