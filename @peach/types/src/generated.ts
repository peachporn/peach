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
  age?: Maybe<Scalars['Int']>;
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
  ids?: Maybe<Array<Scalars['Int']>>;
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
  scrapeActress?: Maybe<ActressScrapeResult>;
  settings: Settings;
  setupStatus: SetupStatus;
  tasks: Array<Task>;
  website?: Maybe<Website>;
  websites: Array<Website>;
  websitesCount: Scalars['Int'];
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
  filter?: Maybe<MovieFilter>;
  sort?: Maybe<MoviesSort>;
};


export type QueryPathExistsArgs = {
  path: Scalars['String'];
};


export type QueryScrapeActressArgs = {
  name: Scalars['String'];
};


export type QueryWebsiteArgs = {
  id: Scalars['Int'];
};


export type QueryWebsitesArgs = {
  filter?: Maybe<WebsiteFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryWebsitesCountArgs = {
  filter?: Maybe<WebsiteFilter>;
};

export type MesaurementsInput = {
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

export type CreateActressInput = {
  name: Scalars['String'];
  aliases?: Maybe<Array<Scalars['String']>>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  boobs?: Maybe<Boobs>;
  piercings?: Maybe<Scalars['String']>;
  tattoos?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<MeasurementsInput>;
  cupsize?: Maybe<Cupsize>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  officialWebsite?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelTask?: Maybe<Scalars['Boolean']>;
  cancelTasks: Scalars['Int'];
  createActress?: Maybe<Actress>;
  createGenre?: Maybe<Genre>;
  createMovieFromFile: Movie;
  createWebsite?: Maybe<Website>;
  deleteGenre?: Maybe<Genre>;
  deleteMovie?: Maybe<Movie>;
  extractMovieInformation: ExtractedMovieInformation;
  restartTask?: Maybe<Task>;
  restartTasks: Scalars['Int'];
  scanLibrary?: Maybe<Scalars['Boolean']>;
  takeAllScreencaps?: Maybe<Scalars['Boolean']>;
  updateActress?: Maybe<Actress>;
  updateGenre?: Maybe<Genre>;
  updateGenreDefinitions?: Maybe<Movie>;
  updateMovie?: Maybe<Movie>;
  updateSettings: Settings;
  updateWebsite?: Maybe<Website>;
};


export type MutationCancelTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationCancelTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};


export type MutationCreateActressArgs = {
  input: CreateActressInput;
};


export type MutationCreateGenreArgs = {
  genreInput: GenreCreateInput;
};


export type MutationCreateMovieFromFileArgs = {
  input: MovieFromFileInput;
};


export type MutationCreateWebsiteArgs = {
  input: CreateWebsiteInput;
};


export type MutationDeleteGenreArgs = {
  genreId: Scalars['Int'];
};


export type MutationDeleteMovieArgs = {
  movieId: Scalars['Int'];
};


export type MutationExtractMovieInformationArgs = {
  movieTitle: Scalars['String'];
};


export type MutationRestartTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationRestartTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};


export type MutationUpdateActressArgs = {
  actressId: Scalars['Int'];
  data: UpdateActressInput;
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
  data: UpdateMovieInput;
};


export type MutationUpdateSettingsArgs = {
  data: UpdateSettingsInput;
};


export type MutationUpdateWebsiteArgs = {
  websiteId: Scalars['Int'];
  data: UpdateWebsiteInput;
};

export type ActressScrapeResult = {
  __typename?: 'ActressScrapeResult';
  name: Scalars['String'];
  aliases?: Maybe<Array<Scalars['String']>>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
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
};

export type UpdateActressInput = {
  name?: Maybe<Scalars['String']>;
  aliases?: Maybe<Array<Scalars['String']>>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  country?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  boobs?: Maybe<Boobs>;
  piercings?: Maybe<Scalars['String']>;
  tattoos?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<MeasurementsInput>;
  cupsize?: Maybe<Cupsize>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  officialWebsite?: Maybe<Scalars['String']>;
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
  linkableChildren?: Maybe<Array<Scalars['Int']>>;
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
  fetishMovies?: Maybe<Array<Movie>>;
  movies?: Maybe<Array<Movie>>;
};

export type GenreFilter = {
  ids?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
  fetish?: Maybe<Scalars['Boolean']>;
  minKinkiness?: Maybe<Scalars['Int']>;
  category?: Maybe<GenreCategory>;
};

export type UpdateGenreInput = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<GenreCategory>;
  validAsRoot?: Maybe<Scalars['Boolean']>;
  validAsFetish?: Maybe<Scalars['Boolean']>;
  kinkiness?: Maybe<Scalars['Int']>;
  linkableChildren?: Maybe<Array<Scalars['Int']>>;
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

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
  detection?: Maybe<Scalars['Int']>;
};

export type Detection = WebsiteDetection | ActressDetection;

export type WebsiteDetection = {
  __typename?: 'WebsiteDetection';
  id: Scalars['Int'];
  content: Website;
};

export type ActressDetection = {
  __typename?: 'ActressDetection';
  id: Scalars['Int'];
  content: Actress;
};

export type ExtractedMovieInformation = {
  __typename?: 'ExtractedMovieInformation';
  tokens: Array<Token>;
  detections: Array<Detection>;
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

export type MovieFilter = {
  title?: Maybe<Scalars['String']>;
  actresses?: Maybe<Array<Scalars['Int']>>;
  websites?: Maybe<Array<Scalars['Int']>>;
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
  website?: Maybe<Website>;
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

export type UpdateMovieInput = {
  title?: Maybe<Scalars['String']>;
  fetishes?: Maybe<Array<Scalars['Int']>>;
  website?: Maybe<Scalars['Int']>;
  actresses?: Maybe<Array<Scalars['Int']>>;
  cover?: Maybe<Scalars['Int']>;
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
  libraryPath?: Maybe<Scalars['String']>;
  volumes: Array<Volume>;
  pinnedFetishes: Array<Genre>;
};

export type SetupStatus = 
  | 'Complete'
  | 'NoVolumes'
  | 'NoLibraryPath';

export type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

export type UpdateSettingsInput = {
  language?: Maybe<Language>;
  inferMovieTitle?: Maybe<InferMovieTitle>;
  libraryPath?: Maybe<Scalars['String']>;
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

export type CreateWebsiteInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  fetish?: Maybe<Scalars['Int']>;
};

export type UpdateWebsiteInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  fetish?: Maybe<Scalars['Int']>;
};

export type Website = {
  __typename?: 'Website';
  id: Scalars['Int'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  fetish?: Maybe<Genre>;
  movies: Array<Movie>;
};

export type WebsiteFilter = {
  ids?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
};

export type ActressCardFragment = { __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> };

export type ActressSearchQueryVariables = Exact<{
  filter: ActressFilter;
  limit: Scalars['Int'];
}>;


export type ActressSearchQuery = { __typename?: 'Query', actresses: Array<(
    { __typename?: 'Actress' }
    & ActressCardFragment
  )> };

export type FetishBubbleFragment = { __typename?: 'Genre', id: number, name: string, picture: string };

export type GenreCardFragment = { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number };

export type GenreClipFragment = { __typename?: 'Genre', id: number, name: string, category: GenreCategory, picture: string };

export type GenreSearchQueryVariables = Exact<{
  filter: GenreFilter;
  limit: Scalars['Int'];
}>;


export type GenreSearchQuery = { __typename?: 'Query', genres: Array<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type MovieCardFragment = { __typename?: 'Movie', id: number, title: string, coverPicture?: Maybe<{ __typename?: 'Screencap', src: string }> };

export type WebsiteCardFragment = { __typename?: 'Website', id: number, name: string, url: string, picture?: Maybe<string>, fetish?: Maybe<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type WebsiteSearchQueryVariables = Exact<{
  filter: WebsiteFilter;
  limit: Scalars['Int'];
}>;


export type WebsiteSearchQuery = { __typename?: 'Query', websites: Array<(
    { __typename?: 'Website' }
    & WebsiteCardFragment
  )> };

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

export type SettingsFragment = { __typename?: 'Settings', id: number, language: Language, inferMovieTitle: InferMovieTitle, libraryPath?: Maybe<string>, volumes: Array<{ __typename?: 'Volume', name: string, path: string }>, pinnedFetishes: Array<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type ActressDetailFragment = { __typename?: 'Actress', id: number, name: string, picture?: Maybe<string>, aliases: Array<string>, haircolor?: Maybe<Haircolor>, eyecolor?: Maybe<Eyecolor>, ethnicity?: Maybe<Ethnicity>, dateOfBirth?: Maybe<string>, dateOfCareerstart?: Maybe<string>, dateOfRetirement?: Maybe<string>, dateOfDeath?: Maybe<string>, age?: Maybe<number>, inBusiness?: Maybe<boolean>, country?: Maybe<string>, province?: Maybe<string>, city?: Maybe<string>, boobs?: Maybe<Boobs>, piercings?: Maybe<string>, tattoos?: Maybe<string>, height?: Maybe<number>, weight?: Maybe<number>, cupsize?: Maybe<Cupsize>, socialMediaLinks?: Maybe<Array<Maybe<string>>>, officialWebsite?: Maybe<string>, location?: Maybe<{ __typename?: 'GeoLocation', latitude: number, longitude: number }>, measurements?: Maybe<{ __typename?: 'Measurements', bust: number, hips: number, waist: number }>, movies?: Maybe<Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }>> };

export type UpdateActressMutationVariables = Exact<{
  actressId: Scalars['Int'];
  data: UpdateActressInput;
}>;


export type UpdateActressMutation = { __typename?: 'Mutation', updateActress?: Maybe<{ __typename?: 'Actress', id: number }> };

export type ActressDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ActressDetailQuery = { __typename?: 'Query', actress?: Maybe<(
    { __typename?: 'Actress' }
    & ActressDetailFragment
  )> };

export type ActressScrapeResultFragment = { __typename?: 'ActressScrapeResult', name: string, aliases?: Maybe<Array<string>>, picture?: Maybe<string>, haircolor?: Maybe<Haircolor>, eyecolor?: Maybe<Eyecolor>, ethnicity?: Maybe<Ethnicity>, cupsize?: Maybe<Cupsize>, boobs?: Maybe<Boobs>, height?: Maybe<number>, weight?: Maybe<number>, dateOfBirth?: Maybe<string>, dateOfCareerstart?: Maybe<string>, dateOfRetirement?: Maybe<string>, dateOfDeath?: Maybe<string>, country?: Maybe<string>, province?: Maybe<string>, city?: Maybe<string>, piercings?: Maybe<string>, tattoos?: Maybe<string>, socialMediaLinks?: Maybe<Array<Maybe<string>>>, officialWebsite?: Maybe<string>, measurements?: Maybe<{ __typename?: 'Measurements', bust: number, waist: number, hips: number }> };

export type CreateActressMutationVariables = Exact<{
  input: CreateActressInput;
}>;


export type CreateActressMutation = { __typename?: 'Mutation', createActress?: Maybe<{ __typename?: 'Actress', id: number }> };

export type ActressesListQueryVariables = Exact<{
  filter?: Maybe<ActressFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type ActressesListQuery = { __typename?: 'Query', actresses: Array<(
    { __typename?: 'Actress' }
    & ActressCardFragment
  )> };

export type ActressesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ActressesCountQuery = { __typename?: 'Query', actressesCount: number };

export type ScrapeActressQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ScrapeActressQuery = { __typename?: 'Query', scrapeActress?: Maybe<(
    { __typename?: 'ActressScrapeResult' }
    & ActressScrapeResultFragment
  )> };

export type GenreDetailFragment = { __typename?: 'Genre', id: number, name: string, category: GenreCategory, kinkiness: number, picture: string, validAsRoot: boolean, validAsFetish: boolean, fetishMovies?: Maybe<Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }>>, movies?: Maybe<Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }>>, linkableChildren: Array<(
    { __typename?: 'Genre' }
    & GenreCardFragment
  )> };

export type DeleteGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
}>;


export type DeleteGenreMutation = { __typename?: 'Mutation', deleteGenre?: Maybe<{ __typename?: 'Genre', id: number }> };

export type UpdateGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
}>;


export type UpdateGenreMutation = { __typename?: 'Mutation', updateGenre?: Maybe<{ __typename?: 'Genre', id: number }> };

export type GenreDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GenreDetailQuery = { __typename?: 'Query', genre?: Maybe<(
    { __typename?: 'Genre' }
    & GenreDetailFragment
  )> };

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


export type HomepageQuery = { __typename?: 'Query', movieCount: number, randomMovies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )>, recentMovies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )>, settings: { __typename?: 'Settings', id: number, pinnedFetishes: Array<(
      { __typename?: 'Genre' }
      & FetishBubbleFragment
    )> } };

export type PinnedFetishesQueryVariables = Exact<{
  fetishIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type PinnedFetishesQuery = { __typename?: 'Query', movies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )> };

export type GenreActionCardFragment = { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> };

export type MovieDetailFragment = { __typename?: 'Movie', id: number, title: string, path: string, videoUrl: string, cover: number, website?: Maybe<(
    { __typename?: 'Website' }
    & WebsiteCardFragment
  )>, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean, index: number }>, volume?: Maybe<{ __typename?: 'Volume', name: string }>, actresses: Array<(
    { __typename?: 'Actress' }
    & ActressCardFragment
  )>, metaData?: Maybe<{ __typename?: 'MovieMetadata', durationSeconds: number, sizeInMB: number, minutes: number, seconds: number, quality: Quality, format: Format, fps: number }>, genres: Array<{ __typename?: 'GenreDefinition', timeStart: number, genre: { __typename?: 'GenreLink', parent: (
        { __typename?: 'Genre' }
        & GenreActionCardFragment
      ), children: Array<(
        { __typename?: 'Genre' }
        & GenreActionCardFragment
      )> } }>, fetishes: Array<(
    { __typename?: 'Genre' }
    & FetishBubbleFragment
  )> };

export type DeleteMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: Maybe<{ __typename?: 'Movie', id: number }> };

export type WebsiteDetectionFragment = { __typename?: 'WebsiteDetection', id: number, content: (
    { __typename?: 'Website', fetish?: Maybe<{ __typename?: 'Genre', id: number }> }
    & WebsiteCardFragment
  ) };

export type ExtractedMovieInformationFragment = { __typename?: 'ExtractedMovieInformation', tokens: Array<{ __typename?: 'Token', token: string, detection?: Maybe<number> }>, detections: Array<(
    { __typename?: 'WebsiteDetection' }
    & WebsiteDetectionFragment
  ) | { __typename?: 'ActressDetection', id: number, content: (
      { __typename?: 'Actress' }
      & ActressCardFragment
    ) }> };

export type ExtractMovieInformationMutationVariables = Exact<{
  movieTitle: Scalars['String'];
}>;


export type ExtractMovieInformationMutation = { __typename?: 'Mutation', extractMovieInformation: (
    { __typename?: 'ExtractedMovieInformation' }
    & ExtractedMovieInformationFragment
  ) };

export type UpdateGenreDefinitionsMutationVariables = Exact<{
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput> | GenreDefinitionInput;
}>;


export type UpdateGenreDefinitionsMutation = { __typename?: 'Mutation', updateGenreDefinitions?: Maybe<{ __typename?: 'Movie', id: number }> };

export type UpdateMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
  input: UpdateMovieInput;
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie?: Maybe<{ __typename?: 'Movie', id: number }> };

export type FindActressQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindActressQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: Maybe<string> }> };

export type FindGenreQueryVariables = Exact<{
  name: Scalars['String'];
  fetish?: Maybe<Scalars['Boolean']>;
}>;


export type FindGenreQuery = { __typename?: 'Query', genres: Array<(
    { __typename?: 'Genre' }
    & GenreActionCardFragment
  )> };

export type MovieDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieDetailQuery = { __typename?: 'Query', movie?: Maybe<(
    { __typename?: 'Movie' }
    & MovieDetailFragment
  )> };

export type MovieFilterDisplayQueryVariables = Exact<{
  genres?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  genreLimit: Scalars['Int'];
  actresses?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  actressLimit: Scalars['Int'];
  websites?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  websiteLimit: Scalars['Int'];
}>;


export type MovieFilterDisplayQuery = { __typename?: 'Query', genres: Array<(
    { __typename?: 'Genre' }
    & GenreCardFragment
  )>, actresses: Array<(
    { __typename?: 'Actress' }
    & ActressCardFragment
  )>, websites: Array<(
    { __typename?: 'Website' }
    & WebsiteCardFragment
  )> };

export type MovieListQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  filter?: Maybe<MovieFilter>;
}>;


export type MovieListQuery = { __typename?: 'Query', movies: Array<(
    { __typename?: 'Movie' }
    & MovieCardFragment
  )> };

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

export type TaskFragment = { __typename?: 'Task', id: number, status: TaskStatus, statusMessage?: Maybe<string>, category: string, parameters?: Maybe<string> };

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


export type TasksQuery = { __typename?: 'Query', tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> };

export type WebsiteDetailFragment = { __typename?: 'Website', id: number, name: string, url: string, picture?: Maybe<string>, fetish?: Maybe<(
    { __typename?: 'Genre' }
    & GenreCardFragment
  )>, movies: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> };

export type UpdateWebsiteMutationVariables = Exact<{
  websiteId: Scalars['Int'];
  data: UpdateWebsiteInput;
}>;


export type UpdateWebsiteMutation = { __typename?: 'Mutation', updateWebsite?: Maybe<{ __typename?: 'Website', id: number }> };

export type WebsiteDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WebsiteDetailQuery = { __typename?: 'Query', website?: Maybe<(
    { __typename?: 'Website' }
    & WebsiteDetailFragment
  )> };

export type CreateWebsiteMutationVariables = Exact<{
  data: CreateWebsiteInput;
}>;


export type CreateWebsiteMutation = { __typename?: 'Mutation', createWebsite?: Maybe<{ __typename?: 'Website', id: number, name: string }> };

export type WebsitesListQueryVariables = Exact<{
  filter?: Maybe<WebsiteFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type WebsitesListQuery = { __typename?: 'Query', websites: Array<(
    { __typename?: 'Website' }
    & WebsiteCardFragment
  )> };

export type WebsitesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type WebsitesCountQuery = { __typename?: 'Query', websitesCount: number };

export type SetupStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SetupStatusQuery = { __typename?: 'Query', setupStatus: SetupStatus };
