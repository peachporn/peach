export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type Haircolor = 
  | 'Blonde'
  | 'Brunette'
  | 'Black'
  | 'Red'
  | 'Auburn'
  | 'Other';

export type Eyecolor = 
  | 'Green'
  | 'Blue'
  | 'Brown'
  | 'Hazel'
  | 'Grey'
  | 'Other';

export type Ethnicity = 
  | 'Caucasian'
  | 'Asian'
  | 'Latina'
  | 'Ebony'
  | 'NativeAmerican'
  | 'Indian';

export type Boobs = 
  | 'Natural'
  | 'Fake';

export type Cupsize = 
  | 'AA'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'DD'
  | 'DDD'
  | 'E'
  | 'F'
  | 'FF'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K';

export type Measurements = {
  __typename?: 'Measurements';
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

export type Actress = {
  __typename?: 'Actress';
  id: Scalars['Int'];
  name: Scalars['String'];
  aliases: Array<Scalars['String']>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  inBusiness?: Maybe<Scalars['Boolean']>;
  country?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  location?: Maybe<GeoLocation>;
  boobs?: Maybe<Boobs>;
  piercings?: Maybe<Scalars['String']>;
  tattoos?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<Measurements>;
  cupsize?: Maybe<Cupsize>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  officialWebsite?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  movies?: Maybe<Array<Movie>>;
};

export type ActressFilter = {
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  actress?: Maybe<Actress>;
  actresses: Array<Actress>;
  actressesCount: Scalars['Int'];
  genre?: Maybe<Genre>;
  genres: Array<Genre>;
  genresCount: Scalars['Int'];
  movie?: Maybe<Movie>;
  movieCount: Scalars['Int'];
  movies: Array<Movie>;
  pathExists?: Maybe<Scalars['Boolean']>;
  settings: Settings;
  setupStatus: SetupStatus;
  tasks: Array<Task>;
};


export type QueryActressArgs = {
  id: Scalars['Int'];
};


export type QueryActressesArgs = {
  filter?: Maybe<ActressFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryActressesCountArgs = {
  filter?: Maybe<ActressFilter>;
};


export type QueryGenreArgs = {
  id: Scalars['Int'];
};


export type QueryGenresArgs = {
  filter?: Maybe<GenreFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGenresCountArgs = {
  filter?: Maybe<GenreFilter>;
};


export type QueryMovieArgs = {
  id: Scalars['Int'];
};


export type QueryMoviesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  filter?: Maybe<MoviesFilter>;
  sort?: Maybe<MoviesSort>;
};


export type QueryPathExistsArgs = {
  path: Scalars['String'];
};

export type ActressCreateInput = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addActressToMovie?: Maybe<Movie>;
  addSubgenre?: Maybe<Genre>;
  cancelTask?: Maybe<Scalars['Boolean']>;
  cancelTasks: Scalars['Int'];
  createActress?: Maybe<Actress>;
  createGenre?: Maybe<Genre>;
  createMovieFromFile: Movie;
  deleteGenre?: Maybe<Genre>;
  deleteMovie?: Maybe<Movie>;
  removeActressFromMovie?: Maybe<Movie>;
  removeSubgenre?: Maybe<Genre>;
  restartTask?: Maybe<Task>;
  restartTasks: Scalars['Int'];
  scanLibrary?: Maybe<Scalars['Boolean']>;
  scrapeActress?: Maybe<Scalars['Boolean']>;
  setMovieFetishes?: Maybe<Movie>;
  takeAllScreencaps?: Maybe<Scalars['Boolean']>;
  updateActress?: Maybe<Actress>;
  updateGenre?: Maybe<Genre>;
  updateGenreDefinitions?: Maybe<Movie>;
  updateMovie?: Maybe<Movie>;
  updateSettings: Settings;
};


export type MutationAddActressToMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};


export type MutationAddSubgenreArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};


export type MutationCancelTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationCancelTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};


export type MutationCreateActressArgs = {
  actress: ActressCreateInput;
};


export type MutationCreateGenreArgs = {
  genreInput: GenreCreateInput;
};


export type MutationCreateMovieFromFileArgs = {
  input: MovieFromFileInput;
};


export type MutationDeleteGenreArgs = {
  genreId: Scalars['Int'];
};


export type MutationDeleteMovieArgs = {
  movieId: Scalars['Int'];
};


export type MutationRemoveActressFromMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};


export type MutationRemoveSubgenreArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};


export type MutationRestartTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationRestartTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};


export type MutationScrapeActressArgs = {
  id: Scalars['Int'];
};


export type MutationSetMovieFetishesArgs = {
  movieId: Scalars['Int'];
  genreIds: Array<Scalars['Int']>;
};


export type MutationUpdateActressArgs = {
  actressId: Scalars['Int'];
  data: ActressUpdateInput;
};


export type MutationUpdateGenreArgs = {
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
};


export type MutationUpdateGenreDefinitionsArgs = {
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput>;
};


export type MutationUpdateMovieArgs = {
  movieId: Scalars['Int'];
  data: MovieUpdateInput;
};


export type MutationUpdateSettingsArgs = {
  data: UpdateSettingsInput;
};

export type ActressUpdateInput = {
  name?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<MeasurementsInput>;
  cupsize?: Maybe<Cupsize>;
  boobs?: Maybe<Boobs>;
  tattoos?: Maybe<Scalars['String']>;
  piercings?: Maybe<Scalars['String']>;
};

export type MeasurementsInput = {
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

export type GenreCreateInput = {
  name: Scalars['String'];
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  validAsRoot: Scalars['Boolean'];
  validAsFetish: Scalars['Boolean'];
};

export type GenreCategory = 
  | 'Position'
  | 'Location'
  | 'Clothing'
  | 'Practice'
  | 'Film'
  | 'Feature'
  | 'BodyPart';

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int'];
  name: Scalars['String'];
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  picture: Scalars['String'];
  validAsRoot: Scalars['Boolean'];
  validAsFetish: Scalars['Boolean'];
  linkableParents: Array<Genre>;
  linkableChildren: Array<Genre>;
};

export type GenreFilter = {
  name?: Maybe<Scalars['String']>;
  fetish?: Maybe<Scalars['Boolean']>;
  minKinkiness?: Maybe<Scalars['Int']>;
  category?: Maybe<GenreCategory>;
};

export type UpdateGenreInput = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<GenreCategory>;
  validAsRoot?: Maybe<Scalars['Boolean']>;
  kinkiness?: Maybe<Scalars['Int']>;
};

export type MovieLocation = {
  volumeName: Scalars['String'];
  filePath: Scalars['String'];
};

export type MovieFromFileInput = {
  title: Scalars['String'];
  location: MovieLocation;
  actors?: Maybe<Scalars['Int']>;
};

export type GenreDefinition = {
  __typename?: 'GenreDefinition';
  id: Scalars['Int'];
  timeStart: Scalars['Float'];
  genre: GenreLink;
};

export type GenreLink = {
  __typename?: 'GenreLink';
  parent: Genre;
  children: Array<Genre>;
};

export type GenreLinkInput = {
  parent: Scalars['Int'];
  children: Array<Scalars['Int']>;
};

export type GenreDefinitionInput = {
  timeStart: Scalars['Float'];
  genre: GenreLinkInput;
};

export type MoviesFilter = {
  fetishes?: Maybe<Array<Scalars['Int']>>;
};

export type MoviesSort = 
  | 'CREATED_AT_DESC'
  | 'RANDOM';

export type MovieMetadata = {
  __typename?: 'MovieMetadata';
  quality: Quality;
  format: Format;
  fps: Scalars['Int'];
  durationSeconds: Scalars['Int'];
  minutes: Scalars['Int'];
  seconds: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  sizeInMB: Scalars['Int'];
};

export type Quality = 
  | 'SD'
  | 'HD'
  | 'FullHD'
  | 'UHD';

export type Format = 
  | 'mp4'
  | 'wmv';

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  videoUrl: Scalars['String'];
  title: Scalars['String'];
  actresses: Array<Actress>;
  actors: Scalars['Int'];
  volume?: Maybe<Volume>;
  metaData?: Maybe<MovieMetadata>;
  path: Scalars['String'];
  screencaps: Array<Screencap>;
  coverPicture?: Maybe<Screencap>;
  cover: Scalars['Int'];
  genres: Array<GenreDefinition>;
  fetishes: Array<Genre>;
};

export type Screencap = {
  __typename?: 'Screencap';
  index: Scalars['Int'];
  cover: Scalars['Boolean'];
  src: Scalars['String'];
};

export type MovieUpdateInput = {
  cover?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Volume = {
  __typename?: 'Volume';
  name: Scalars['String'];
  path: Scalars['String'];
};

export type Language = 
  | 'EN';

export type InferMovieTitle = 
  | 'FOLDER'
  | 'FILENAME';

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['Int'];
  language: Language;
  inferMovieTitle: InferMovieTitle;
  actressImagePath?: Maybe<Scalars['String']>;
  genreImagePath?: Maybe<Scalars['String']>;
  screencapPath?: Maybe<Scalars['String']>;
  volumes: Array<Volume>;
  pinnedFetishes: Array<Genre>;
};

export type SetupStatus = 
  | 'Complete'
  | 'NoVolumes';

export type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

export type UpdateSettingsInput = {
  language?: Maybe<Language>;
  inferMovieTitle?: Maybe<InferMovieTitle>;
  actressImagePath?: Maybe<Scalars['String']>;
  genreImagePath?: Maybe<Scalars['String']>;
  screencapPath?: Maybe<Scalars['String']>;
  pinnedFetishes?: Maybe<Array<Scalars['Int']>>;
  volumes: Array<VolumeInput>;
};

export type TaskStatus = 
  | 'RUNNING'
  | 'PENDING'
  | 'ERROR';

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  category: Scalars['String'];
  status: TaskStatus;
  parameters?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type FetishBubbleFragment = { __typename?: 'Genre', id: number, name: string, picture: string };

export type GenreCardFragment = { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number };

export type MovieCardFragment = { __typename?: 'Movie', id: number, title: string, coverPicture?: Maybe<{ __typename?: 'Screencap', src: string }> };

export type UpdateSettingsMutationVariables = Exact<{
  data: UpdateSettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings: (
    { __typename?: 'Settings' }
    & SettingsFragment
  ) };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings: (
    { __typename?: 'Settings' }
    & SettingsFragment
  ) };

export type PathExistsQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type PathExistsQuery = { __typename?: 'Query', pathExists?: Maybe<boolean> };

export type SettingsFragment = { __typename?: 'Settings', id: number, language: Language, inferMovieTitle: InferMovieTitle, actressImagePath?: Maybe<string>, genreImagePath?: Maybe<string>, screencapPath?: Maybe<string>, volumes: Array<{ __typename?: 'Volume', name: string, path: string }>, pinnedFetishes: Array<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type ScrapeActressMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ScrapeActressMutation = { __typename?: 'Mutation', scrapeActress?: Maybe<boolean> };

export type UpdateActressMutationVariables = Exact<{
  actressId: Scalars['Int'];
  data: ActressUpdateInput;
}>;


export type UpdateActressMutation = { __typename?: 'Mutation', updateActress?: Maybe<{ __typename?: 'Actress', id: number }> };

export type ActressQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ActressQuery = { __typename?: 'Query', actress?: Maybe<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string>, aliases: Array<string>, haircolor?: Maybe<Haircolor>, eyecolor?: Maybe<Eyecolor>, ethnicity?: Maybe<Ethnicity>, dateOfBirth?: Maybe<string>, dateOfCareerstart?: Maybe<string>, dateOfRetirement?: Maybe<string>, dateOfDeath?: Maybe<string>, inBusiness?: Maybe<boolean>, country?: Maybe<string>, province?: Maybe<string>, city?: Maybe<string>, boobs?: Maybe<Boobs>, piercings?: Maybe<string>, tattoos?: Maybe<string>, height?: Maybe<number>, weight?: Maybe<number>, cupsize?: Maybe<Cupsize>, socialMediaLinks?: Maybe<Array<Maybe<string>>>, officialWebsite?: Maybe<string>, location?: Maybe<{ __typename?: 'GeoLocation', latitude: number, longitude: number }>, measurements?: Maybe<{ __typename?: 'Measurements', bust: number, hips: number, waist: number }>, movies?: Maybe<Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }>> }> };

export type ActressesListQueryVariables = Exact<{
  filter?: Maybe<ActressFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type ActressesListQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }> };

export type ActressesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ActressesCountQuery = { __typename?: 'Query', actressesCount: number };

export type DeleteGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
}>;


export type DeleteGenreMutation = { __typename?: 'Mutation', deleteGenre?: Maybe<{ __typename?: 'Genre', id: number }> };

export type UpdateGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
}>;


export type UpdateGenreMutation = { __typename?: 'Mutation', updateGenre?: Maybe<{ __typename?: 'Genre', id: number }> };

export type AddSubgenreMutationVariables = Exact<{
  parentId: Scalars['Int'];
  childId: Scalars['Int'];
}>;


export type AddSubgenreMutation = { __typename?: 'Mutation', addSubgenre?: Maybe<{ __typename?: 'Genre', id: number, name: string, category: GenreCategory, picture: string }> };

export type RemoveSubgenreMutationVariables = Exact<{
  parentId: Scalars['Int'];
  childId: Scalars['Int'];
}>;


export type RemoveSubgenreMutation = { __typename?: 'Mutation', removeSubgenre?: Maybe<{ __typename?: 'Genre', id: number }> };

export type GenreQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GenreQuery = { __typename?: 'Query', genre?: Maybe<{ __typename?: 'Genre', id: number, name: string, category: GenreCategory, kinkiness: number, picture: string, validAsRoot: boolean, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string, category: GenreCategory, picture: string }> }> };

export type CreateGenreMutationVariables = Exact<{
  data: GenreCreateInput;
}>;


export type CreateGenreMutation = { __typename?: 'Mutation', createGenre?: Maybe<{ __typename?: 'Genre', id: number, name: string }> };

export type GenresListQueryVariables = Exact<{
  filter?: Maybe<GenreFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GenresListQuery = { __typename?: 'Query', genres: Array<(
    { __typename?: 'Genre' }
    & GenreCardFragment
  )> };

export type GenresCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresCountQuery = { __typename?: 'Query', genresCount: number };

export type HomepageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomepageQuery = { __typename?: 'Query', randomMovies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )>, recentMovies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )>, settings: { __typename?: 'Settings', id: number, pinnedFetishes: Array<{ __typename?: 'Genre', name: string }> } };

export type CreateActressMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateActressMutation = { __typename?: 'Mutation', createActress?: Maybe<{ __typename?: 'Actress', id: number, name: string }> };

export type DeleteMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: Maybe<{ __typename?: 'Movie', id: number }> };

export type UpdateGenreDefinitionsMutationVariables = Exact<{
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput> | GenreDefinitionInput;
}>;


export type UpdateGenreDefinitionsMutation = { __typename?: 'Mutation', updateGenreDefinitions?: Maybe<{ __typename?: 'Movie', id: number }> };

export type UpdateCoverMutationVariables = Exact<{
  movieId: Scalars['Int'];
  cover: Scalars['Int'];
}>;


export type UpdateCoverMutation = { __typename?: 'Mutation', updateMovie?: Maybe<{ __typename?: 'Movie', screencaps: Array<{ __typename?: 'Screencap', index: number, src: string, cover: boolean }> }> };

export type UpdateTitleMutationVariables = Exact<{
  movieId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type UpdateTitleMutation = { __typename?: 'Mutation', updateMovie?: Maybe<{ __typename?: 'Movie', title: string }> };

export type AddActressToMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
}>;


export type AddActressToMovieMutation = { __typename?: 'Mutation', addActressToMovie?: Maybe<{ __typename?: 'Movie', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }> }> };

export type RemoveActressFromMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
}>;


export type RemoveActressFromMovieMutation = { __typename?: 'Mutation', removeActressFromMovie?: Maybe<{ __typename?: 'Movie', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }> }> };

export type SetMovieFetishesMutationVariables = Exact<{
  movieId: Scalars['Int'];
  genreIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type SetMovieFetishesMutation = { __typename?: 'Mutation', setMovieFetishes?: Maybe<{ __typename?: 'Movie', fetishes: Array<{ __typename?: 'Genre', name: string }> }> };

export type FindActressQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindActressQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }> };

export type FindGenreQueryVariables = Exact<{
  name: Scalars['String'];
  fetish?: Maybe<Scalars['Boolean']>;
}>;


export type FindGenreQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, category: GenreCategory, picture: string, validAsRoot: boolean, validAsFetish: boolean, linkableChildren: Array<{ __typename?: 'Genre', id: number }> }> };

export type MovieQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieQuery = { __typename?: 'Query', movie?: Maybe<(
    { __typename?: 'Movie' }
    & MovieDetailFragment
  )> };

export type MovieDetailFragment = { __typename?: 'Movie', id: number, title: string, path: string, videoUrl: string, cover: number, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean, index: number }>, volume?: Maybe<{ __typename?: 'Volume', name: string }>, actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }>, metaData?: Maybe<{ __typename?: 'MovieMetadata', durationSeconds: number, sizeInMB: number, minutes: number, seconds: number, quality: Quality, format: Format, fps: number }>, genres: Array<{ __typename?: 'GenreDefinition', timeStart: number, genre: { __typename?: 'GenreLink', parent: { __typename?: 'Genre', id: number, name: string, picture: string, validAsRoot: boolean, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number }> }, children: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, validAsRoot: boolean, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number }> }> } }>, fetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> };

export type MovieListQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  filter?: Maybe<MoviesFilter>;
}>;


export type MovieListQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, index: number, cover: boolean }> }> };

export type MovieCountQueryVariables = Exact<{ [key: string]: never; }>;


export type MovieCountQuery = { __typename?: 'Query', movieCount: number };

export type FetishesQueryVariables = Exact<{
  name: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type FetishesQuery = { __typename?: 'Query', genres: Array<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type ScanLibraryMutationVariables = Exact<{ [key: string]: never; }>;


export type ScanLibraryMutation = { __typename?: 'Mutation', scanLibrary?: Maybe<boolean> };

export type TakeAllScreencapsMutationVariables = Exact<{ [key: string]: never; }>;


export type TakeAllScreencapsMutation = { __typename?: 'Mutation', takeAllScreencaps?: Maybe<boolean> };

export type RestartTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type RestartTaskMutation = { __typename?: 'Mutation', restartTask?: Maybe<{ __typename?: 'Task', id: number }> };

export type RestartTasksMutationVariables = Exact<{
  taskIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type RestartTasksMutation = { __typename?: 'Mutation', restartTasks: number };

export type CancelTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type CancelTaskMutation = { __typename?: 'Mutation', cancelTask?: Maybe<boolean> };

export type CancelTasksMutationVariables = Exact<{
  taskIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CancelTasksMutation = { __typename?: 'Mutation', cancelTasks: number };

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: number, status: TaskStatus, statusMessage?: Maybe<string>, category: string, parameters?: Maybe<string> }> };

export type SetupStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SetupStatusQuery = { __typename?: 'Query', setupStatus: SetupStatus };
