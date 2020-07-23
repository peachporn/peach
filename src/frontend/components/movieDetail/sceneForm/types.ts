export type SceneDraft = {
  timeStart: number;
  timeEnd?: number;
  genres?: GenreLink[];
};

export type GenreLink = {
  parent: SceneGenre;
  children: SceneGenre[];
};

export type SceneGenre = Pick<Genre, 'id' | 'name' | 'picture' | 'validAsRoot'> & {
  linkableChildren: { id: number }[];
};
