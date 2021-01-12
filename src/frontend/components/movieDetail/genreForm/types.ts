export type GenreDefinitionDraft = {
  timeStart: number;
  genre: GenreLink;
};

export type GenreLink = {
  parent: DefinableGenre;
  children: DefinableGenre[];
};

export type DefinableGenre = Pick<Genre, 'id' | 'name' | 'picture' | 'validAsRoot' | 'category'> & {
  linkableChildren: { id: number }[];
};
