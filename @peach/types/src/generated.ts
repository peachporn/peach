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

export type Actress = {
  __typename?: 'Actress';
  aliases: Array<Scalars['String']>;
  appearance?: Maybe<ActressAppearance>;
  contact?: Maybe<ActressContact>;
  dates?: Maybe<ActressDates>;
  id: Scalars['Int'];
  location?: Maybe<ActressLocation>;
  movies?: Maybe<Array<Movie>>;
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
};

export type ActressAppearance = {
  __typename?: 'ActressAppearance';
  equipment: Array<Equipment>;
  eyecolor?: Maybe<Eyecolor>;
  genderExpression: GenderExpression;
  haircolor?: Maybe<Haircolor>;
  height?: Maybe<Scalars['Int']>;
  measurements?: Maybe<Measurements>;
  piercings?: Maybe<Scalars['String']>;
  tattoos?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type ActressContact = {
  __typename?: 'ActressContact';
  officialWebsite?: Maybe<Scalars['String']>;
  socialMediaLinks?: Maybe<Array<Scalars['String']>>;
};

export type ActressDates = {
  __typename?: 'ActressDates';
  age?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  inBusiness?: Maybe<Scalars['Boolean']>;
};

export type ActressDetection = {
  __typename?: 'ActressDetection';
  content: Actress;
  id: Scalars['Int'];
};

export type ActressFilter = {
  ids?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
};

export type ActressLocation = {
  __typename?: 'ActressLocation';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  location?: Maybe<GeoLocation>;
  province?: Maybe<Scalars['String']>;
};

export type ActressMovieFilter = {
  __typename?: 'ActressMovieFilter';
  actress: Actress;
};

export type ActressScrapeRequest = {
  detailUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ActressScrapeResult = {
  __typename?: 'ActressScrapeResult';
  actress?: Maybe<ScrapedActress>;
  alternatives: Array<ScrapeAlternative>;
};

export type CreateActressInput = {
  aliases?: Maybe<Array<Scalars['String']>>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  equipment: Array<EquipmentInput>;
  eyecolor?: Maybe<Eyecolor>;
  genderExpression: GenderExpression;
  haircolor?: Maybe<Haircolor>;
  height?: Maybe<Scalars['Int']>;
  measurements?: Maybe<MeasurementsInput>;
  name: Scalars['String'];
  officialWebsite?: Maybe<Scalars['String']>;
  piercings?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  socialMediaLinks?: Maybe<Array<Scalars['String']>>;
  tattoos?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type CreateWebsiteInput = {
  fetish?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Cupsize =
  | 'A'
  | 'AA'
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

export type Detection = ActressDetection | WebsiteDetection;

export type Dick = {
  __typename?: 'Dick';
  isDick?: Maybe<Scalars['Boolean']>;
};

export type Equipment = Dick | Pussy | Tits;

export type EquipmentInput = {
  hasImplants?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Cupsize>;
  type: EquipmentInputType;
};

export type EquipmentInputType =
  | 'Dick'
  | 'Pussy'
  | 'Tits';

export type ExtractedMovieInformation = {
  __typename?: 'ExtractedMovieInformation';
  detections: Array<Detection>;
  tokens: Array<Token>;
};

export type Eyecolor =
  | 'Blue'
  | 'Brown'
  | 'Green'
  | 'Grey'
  | 'Hazel'
  | 'Other'
  | 'Unknown';

export type FetishMovieFilter = {
  __typename?: 'FetishMovieFilter';
  genre: Genre;
};

export type Format =
  | 'avi'
  | 'mkv'
  | 'mp4'
  | 'wmv';

export type GenderExpression =
  | 'Androgynous'
  | 'Female'
  | 'Male';

export type Genre = {
  __typename?: 'Genre';
  category: GenreCategory;
  fetishMovies?: Maybe<Array<Movie>>;
  id: Scalars['Int'];
  kinkiness: Scalars['Int'];
  linkableChildren: Array<Genre>;
  linkableParents: Array<Genre>;
  movies?: Maybe<Array<Movie>>;
  name: Scalars['String'];
  picture: Scalars['String'];
  validAsFetish: Scalars['Boolean'];
  validAsRoot: Scalars['Boolean'];
};

export type GenreCategory =
  | 'BodyPart'
  | 'Clothing'
  | 'Feature'
  | 'Film'
  | 'Location'
  | 'Position'
  | 'Practice';

export type GenreCreateInput = {
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  linkableChildren?: Maybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
  validAsFetish: Scalars['Boolean'];
  validAsRoot: Scalars['Boolean'];
};

export type GenreDefinition = {
  __typename?: 'GenreDefinition';
  genre: GenreLink;
  id: Scalars['Int'];
  timeStart: Scalars['Float'];
};

export type GenreDefinitionInput = {
  genre: GenreLinkInput;
  timeStart: Scalars['Float'];
};

export type GenreFilter = {
  category?: Maybe<GenreCategory>;
  fetish?: Maybe<Scalars['Boolean']>;
  ids?: Maybe<Array<Scalars['Int']>>;
  minKinkiness?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type GenreLink = {
  __typename?: 'GenreLink';
  children: Array<Genre>;
  parent: Genre;
};

export type GenreLinkInput = {
  children: Array<Scalars['Int']>;
  parent: Scalars['Int'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Haircolor =
  | 'Auburn'
  | 'Black'
  | 'Blonde'
  | 'Brunette'
  | 'Other'
  | 'Red'
  | 'Unknown';

export type InferMovieTitle =
  | 'FILENAME'
  | 'FOLDER';

export type Language =
  | 'EN';

export type Measurements = {
  __typename?: 'Measurements';
  chest: Scalars['Int'];
  hips: Scalars['Int'];
  waist: Scalars['Int'];
};

export type MeasurementsInput = {
  chest: Scalars['Int'];
  hips: Scalars['Int'];
  waist: Scalars['Int'];
};

export type Movie = {
  __typename?: 'Movie';
  actresses: Array<Actress>;
  cover: Scalars['Int'];
  coverPicture?: Maybe<Screencap>;
  createdAt: Scalars['String'];
  fetishes: Array<Genre>;
  genres: Array<GenreDefinition>;
  id: Scalars['Int'];
  metaData?: Maybe<MovieMetadata>;
  path: Scalars['String'];
  screencaps: Array<Screencap>;
  title: Scalars['String'];
  untouched: Scalars['Boolean'];
  videoUrl: Scalars['String'];
  volume?: Maybe<Volume>;
  website?: Maybe<Website>;
};

export type MovieCountResponse = {
  __typename?: 'MovieCountResponse';
  all: Scalars['Int'];
  untouched: Scalars['Int'];
};

export type MovieFilter = ActressMovieFilter | FetishMovieFilter | TitleMovieFilter | UntouchedMovieFilter | WebsiteMovieFilter;

export type MovieFilterInput = {
  actresses?: Maybe<Array<Scalars['Int']>>;
  fetishes?: Maybe<Array<Scalars['Int']>>;
  title?: Maybe<Scalars['String']>;
  untouched?: Maybe<Scalars['Boolean']>;
  websites?: Maybe<Array<Scalars['Int']>>;
};

export type MovieFromFileInput = {
  actors?: Maybe<Scalars['Int']>;
  location: MovieLocation;
  title: Scalars['String'];
};

export type MovieLocation = {
  filePath: Scalars['String'];
  volumeName: Scalars['String'];
};

export type MovieMetadata = {
  __typename?: 'MovieMetadata';
  durationSeconds: Scalars['Int'];
  format: Format;
  fps: Scalars['Int'];
  minutes: Scalars['Int'];
  quality: Quality;
  seconds: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  sizeInMB: Scalars['Int'];
};

export type MoviesSort =
  | 'CREATED_AT_DESC'
  | 'RANDOM';

export type Mutation = {
  __typename?: 'Mutation';
  cancelTask?: Maybe<Scalars['Boolean']>;
  cancelTasks: Scalars['Int'];
  convertMovie?: Maybe<Scalars['Boolean']>;
  createActress?: Maybe<Actress>;
  createGenre?: Maybe<Genre>;
  createMovieFromFile: Movie;
  createWebsite?: Maybe<Website>;
  deleteGenre?: Maybe<Genre>;
  deleteMovie?: Maybe<Movie>;
  extractMovieInformation: ExtractedMovieInformation;
  generateSlugs: Scalars['Boolean'];
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


export type MutationConvertMovieArgs = {
  movieId: Scalars['Int'];
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
  data: UpdateGenreInput;
  genreId: Scalars['Int'];
};


export type MutationUpdateGenreDefinitionsArgs = {
  genreDefinitions: Array<GenreDefinitionInput>;
  movieId: Scalars['Int'];
};


export type MutationUpdateMovieArgs = {
  data: UpdateMovieInput;
  movieId: Scalars['Int'];
};


export type MutationUpdateSettingsArgs = {
  data: UpdateSettingsInput;
};


export type MutationUpdateWebsiteArgs = {
  data: UpdateWebsiteInput;
  websiteId: Scalars['Int'];
};

export type Pussy = {
  __typename?: 'Pussy';
  isPussy?: Maybe<Scalars['Boolean']>;
};

export type Quality =
  | 'FullHD'
  | 'HD'
  | 'SD'
  | 'UHD';

export type Query = {
  __typename?: 'Query';
  actress?: Maybe<Actress>;
  actresses: Array<Actress>;
  actressesCount: Scalars['Int'];
  genre?: Maybe<Genre>;
  genres: Array<Genre>;
  genresCount: Scalars['Int'];
  movie?: Maybe<Movie>;
  movieCount: MovieCountResponse;
  movieFilters: Array<MovieFilter>;
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


export type QueryMovieFiltersArgs = {
  query: Scalars['String'];
};


export type QueryMoviesArgs = {
  filter?: Maybe<MovieFilterInput>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<MoviesSort>;
};


export type QueryPathExistsArgs = {
  path: Scalars['String'];
};


export type QueryScrapeActressArgs = {
  request: ActressScrapeRequest;
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

export type ScrapeAlternative = {
  __typename?: 'ScrapeAlternative';
  aliases?: Maybe<Array<Scalars['String']>>;
  detailUrl: Scalars['String'];
  name: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
};

export type ScrapedActress = {
  __typename?: 'ScrapedActress';
  aliases?: Maybe<Array<Scalars['String']>>;
  appearance?: Maybe<ActressAppearance>;
  contact?: Maybe<ActressContact>;
  dates?: Maybe<ActressDates>;
  location?: Maybe<ActressLocation>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type Screencap = {
  __typename?: 'Screencap';
  cover: Scalars['Boolean'];
  index: Scalars['Int'];
  src: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['Int'];
  inferMovieTitle: InferMovieTitle;
  language: Language;
  libraryPath?: Maybe<Scalars['String']>;
  pinnedFetishes: Array<Genre>;
  volumes: Array<Volume>;
};

export type SetupStatus =
  | 'Complete'
  | 'NoLibraryPath'
  | 'NoVolumes';

export type Task = {
  __typename?: 'Task';
  category: Scalars['String'];
  id: Scalars['Int'];
  parameters?: Maybe<Scalars['String']>;
  status: TaskStatus;
  statusMessage?: Maybe<Scalars['String']>;
};

export type TaskStatus =
  | 'ERROR'
  | 'PENDING'
  | 'RUNNING';

export type TitleMovieFilter = {
  __typename?: 'TitleMovieFilter';
  title: Scalars['String'];
};

export type Tits = {
  __typename?: 'Tits';
  hasImplants: Scalars['Boolean'];
  size: Cupsize;
};

export type Token = {
  __typename?: 'Token';
  detection?: Maybe<Scalars['Int']>;
  token: Scalars['String'];
};

export type UntouchedMovieFilter = {
  __typename?: 'UntouchedMovieFilter';
  untouched: Scalars['Boolean'];
};

export type UpdateActressInput = {
  aliases?: Maybe<Array<Scalars['String']>>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  equipment?: Maybe<Array<Maybe<EquipmentInput>>>;
  eyecolor?: Maybe<Eyecolor>;
  genderExpression?: Maybe<GenderExpression>;
  haircolor?: Maybe<Haircolor>;
  height?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  measurements?: Maybe<MeasurementsInput>;
  name?: Maybe<Scalars['String']>;
  officialWebsite?: Maybe<Scalars['String']>;
  piercings?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  tattoos?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type UpdateGenreInput = {
  category?: Maybe<GenreCategory>;
  kinkiness?: Maybe<Scalars['Int']>;
  linkableChildren?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
  validAsFetish?: Maybe<Scalars['Boolean']>;
  validAsRoot?: Maybe<Scalars['Boolean']>;
};

export type UpdateMovieInput = {
  actresses?: Maybe<Array<Scalars['Int']>>;
  cover?: Maybe<Scalars['Int']>;
  fetishes?: Maybe<Array<Scalars['Int']>>;
  title?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['Int']>;
};

export type UpdateSettingsInput = {
  inferMovieTitle?: Maybe<InferMovieTitle>;
  language?: Maybe<Language>;
  libraryPath?: Maybe<Scalars['String']>;
  pinnedFetishes?: Maybe<Array<Scalars['Int']>>;
  volumes: Array<VolumeInput>;
};

export type UpdateWebsiteInput = {
  fetish?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Volume = {
  __typename?: 'Volume';
  name: Scalars['String'];
  path: Scalars['String'];
};

export type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

export type Website = {
  __typename?: 'Website';
  fetish?: Maybe<Genre>;
  id: Scalars['Int'];
  movies: Array<Movie>;
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type WebsiteDetection = {
  __typename?: 'WebsiteDetection';
  content: Website;
  id: Scalars['Int'];
};

export type WebsiteFilter = {
  ids?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
};

export type WebsiteMovieFilter = {
  __typename?: 'WebsiteMovieFilter';
  website: Website;
};

export type ActressCardFragment = { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined };

export type ScrapeActressQueryVariables = Exact<{
  request: ActressScrapeRequest;
}>;


export type ScrapeActressQuery = { __typename?: 'Query', scrapeActress?: { __typename?: 'ActressScrapeResult', actress?: { __typename?: 'ScrapedActress', name?: string | null | undefined, aliases?: Array<string> | null | undefined, picture?: string | null | undefined, appearance?: { __typename?: 'ActressAppearance', genderExpression: GenderExpression, haircolor?: Haircolor | null | undefined, eyecolor?: Eyecolor | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, piercings?: string | null | undefined, tattoos?: string | null | undefined, equipment: Array<{ __typename?: 'Dick' } | { __typename?: 'Pussy' } | { __typename?: 'Tits', hasImplants: boolean, size: Cupsize }>, measurements?: { __typename?: 'Measurements', chest: number, waist: number, hips: number } | null | undefined } | null | undefined, dates?: { __typename?: 'ActressDates', dateOfBirth?: string | null | undefined, dateOfCareerstart?: string | null | undefined, dateOfRetirement?: string | null | undefined, dateOfDeath?: string | null | undefined } | null | undefined, location?: { __typename?: 'ActressLocation', country?: string | null | undefined, province?: string | null | undefined, city?: string | null | undefined } | null | undefined, contact?: { __typename?: 'ActressContact', socialMediaLinks?: Array<string> | null | undefined, officialWebsite?: string | null | undefined } | null | undefined } | null | undefined, alternatives: Array<{ __typename?: 'ScrapeAlternative', name: string, aliases?: Array<string> | null | undefined, pictureUrl?: string | null | undefined, detailUrl: string }> } | null | undefined };

export type ActressSearchQueryVariables = Exact<{
  filter: ActressFilter;
  limit: Scalars['Int'];
}>;


export type ActressSearchQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }> };

export type FetishBubbleFragment = { __typename?: 'Genre', id: number, name: string, picture: string };

export type GenreCardFragment = { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number };

export type GenreClipFragment = { __typename?: 'Genre', id: number, name: string, category: GenreCategory, picture: string };

export type GenreSearchQueryVariables = Exact<{
  filter: GenreFilter;
  limit: Scalars['Int'];
}>;


export type GenreSearchQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> };

export type MovieCardFragment = { __typename?: 'Movie', id: number, title: string, coverPicture?: { __typename?: 'Screencap', src: string } | null | undefined };

export type WebsiteCardFragment = { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined };

export type WebsiteSearchQueryVariables = Exact<{
  filter: WebsiteFilter;
  limit: Scalars['Int'];
}>;


export type WebsiteSearchQuery = { __typename?: 'Query', websites: Array<{ __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined }> };

export type UpdateSettingsMutationVariables = Exact<{
  data: UpdateSettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings: { __typename?: 'Settings', id: number, language: Language, inferMovieTitle: InferMovieTitle, libraryPath?: string | null | undefined, volumes: Array<{ __typename?: 'Volume', name: string, path: string }>, pinnedFetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings: { __typename?: 'Settings', id: number, language: Language, inferMovieTitle: InferMovieTitle, libraryPath?: string | null | undefined, volumes: Array<{ __typename?: 'Volume', name: string, path: string }>, pinnedFetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> } };

export type PathExistsQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type PathExistsQuery = { __typename?: 'Query', pathExists?: boolean | null | undefined };

export type SettingsFragment = { __typename?: 'Settings', id: number, language: Language, inferMovieTitle: InferMovieTitle, libraryPath?: string | null | undefined, volumes: Array<{ __typename?: 'Volume', name: string, path: string }>, pinnedFetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> };

export type ActressDetailFragment = { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined, aliases: Array<string>, appearance?: { __typename?: 'ActressAppearance', genderExpression: GenderExpression, haircolor?: Haircolor | null | undefined, eyecolor?: Eyecolor | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, piercings?: string | null | undefined, tattoos?: string | null | undefined, equipment: Array<{ __typename?: 'Dick' } | { __typename?: 'Pussy' } | { __typename?: 'Tits', hasImplants: boolean, size: Cupsize }>, measurements?: { __typename?: 'Measurements', chest: number, hips: number, waist: number } | null | undefined } | null | undefined, dates?: { __typename?: 'ActressDates', dateOfBirth?: string | null | undefined, dateOfCareerstart?: string | null | undefined, dateOfRetirement?: string | null | undefined, dateOfDeath?: string | null | undefined, age?: number | null | undefined, inBusiness?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'ActressLocation', country?: string | null | undefined, province?: string | null | undefined, city?: string | null | undefined, location?: { __typename?: 'GeoLocation', latitude: number, longitude: number } | null | undefined } | null | undefined, contact?: { __typename?: 'ActressContact', socialMediaLinks?: Array<string> | null | undefined, officialWebsite?: string | null | undefined } | null | undefined, movies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined };

export type UpdateActressMutationVariables = Exact<{
  actressId: Scalars['Int'];
  data: UpdateActressInput;
}>;


export type UpdateActressMutation = { __typename?: 'Mutation', updateActress?: { __typename?: 'Actress', id: number } | null | undefined };

export type ActressDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ActressDetailQuery = { __typename?: 'Query', actress?: { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined, aliases: Array<string>, appearance?: { __typename?: 'ActressAppearance', genderExpression: GenderExpression, haircolor?: Haircolor | null | undefined, eyecolor?: Eyecolor | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, piercings?: string | null | undefined, tattoos?: string | null | undefined, equipment: Array<{ __typename?: 'Dick' } | { __typename?: 'Pussy' } | { __typename?: 'Tits', hasImplants: boolean, size: Cupsize }>, measurements?: { __typename?: 'Measurements', chest: number, hips: number, waist: number } | null | undefined } | null | undefined, dates?: { __typename?: 'ActressDates', dateOfBirth?: string | null | undefined, dateOfCareerstart?: string | null | undefined, dateOfRetirement?: string | null | undefined, dateOfDeath?: string | null | undefined, age?: number | null | undefined, inBusiness?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'ActressLocation', country?: string | null | undefined, province?: string | null | undefined, city?: string | null | undefined, location?: { __typename?: 'GeoLocation', latitude: number, longitude: number } | null | undefined } | null | undefined, contact?: { __typename?: 'ActressContact', socialMediaLinks?: Array<string> | null | undefined, officialWebsite?: string | null | undefined } | null | undefined, movies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined } | null | undefined };

export type ScrapedActressFragment = { __typename?: 'ScrapedActress', name?: string | null | undefined, aliases?: Array<string> | null | undefined, picture?: string | null | undefined, appearance?: { __typename?: 'ActressAppearance', genderExpression: GenderExpression, haircolor?: Haircolor | null | undefined, eyecolor?: Eyecolor | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, piercings?: string | null | undefined, tattoos?: string | null | undefined, equipment: Array<{ __typename?: 'Dick' } | { __typename?: 'Pussy' } | { __typename?: 'Tits', hasImplants: boolean, size: Cupsize }>, measurements?: { __typename?: 'Measurements', chest: number, waist: number, hips: number } | null | undefined } | null | undefined, dates?: { __typename?: 'ActressDates', dateOfBirth?: string | null | undefined, dateOfCareerstart?: string | null | undefined, dateOfRetirement?: string | null | undefined, dateOfDeath?: string | null | undefined } | null | undefined, location?: { __typename?: 'ActressLocation', country?: string | null | undefined, province?: string | null | undefined, city?: string | null | undefined } | null | undefined, contact?: { __typename?: 'ActressContact', socialMediaLinks?: Array<string> | null | undefined, officialWebsite?: string | null | undefined } | null | undefined };

export type ScrapeAlternativeFragment = { __typename?: 'ScrapeAlternative', name: string, aliases?: Array<string> | null | undefined, pictureUrl?: string | null | undefined, detailUrl: string };

export type ActressScrapeResultFragment = { __typename?: 'ActressScrapeResult', actress?: { __typename?: 'ScrapedActress', name?: string | null | undefined, aliases?: Array<string> | null | undefined, picture?: string | null | undefined, appearance?: { __typename?: 'ActressAppearance', genderExpression: GenderExpression, haircolor?: Haircolor | null | undefined, eyecolor?: Eyecolor | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, piercings?: string | null | undefined, tattoos?: string | null | undefined, equipment: Array<{ __typename?: 'Dick' } | { __typename?: 'Pussy' } | { __typename?: 'Tits', hasImplants: boolean, size: Cupsize }>, measurements?: { __typename?: 'Measurements', chest: number, waist: number, hips: number } | null | undefined } | null | undefined, dates?: { __typename?: 'ActressDates', dateOfBirth?: string | null | undefined, dateOfCareerstart?: string | null | undefined, dateOfRetirement?: string | null | undefined, dateOfDeath?: string | null | undefined } | null | undefined, location?: { __typename?: 'ActressLocation', country?: string | null | undefined, province?: string | null | undefined, city?: string | null | undefined } | null | undefined, contact?: { __typename?: 'ActressContact', socialMediaLinks?: Array<string> | null | undefined, officialWebsite?: string | null | undefined } | null | undefined } | null | undefined, alternatives: Array<{ __typename?: 'ScrapeAlternative', name: string, aliases?: Array<string> | null | undefined, pictureUrl?: string | null | undefined, detailUrl: string }> };

export type CreateActressMutationVariables = Exact<{
  input: CreateActressInput;
}>;


export type CreateActressMutation = { __typename?: 'Mutation', createActress?: { __typename?: 'Actress', id: number } | null | undefined };

export type ActressesListQueryVariables = Exact<{
  filter?: Maybe<ActressFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type ActressesListQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }> };

export type ActressesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ActressesCountQuery = { __typename?: 'Query', actressesCount: number };

export type GenreDetailFragment = { __typename?: 'Genre', id: number, name: string, category: GenreCategory, kinkiness: number, picture: string, validAsRoot: boolean, validAsFetish: boolean, fetishMovies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined, movies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number }> };

export type DeleteGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
}>;


export type DeleteGenreMutation = { __typename?: 'Mutation', deleteGenre?: { __typename?: 'Genre', id: number } | null | undefined };

export type UpdateGenreMutationVariables = Exact<{
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
}>;


export type UpdateGenreMutation = { __typename?: 'Mutation', updateGenre?: { __typename?: 'Genre', id: number } | null | undefined };

export type GenreDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GenreDetailQuery = { __typename?: 'Query', genre?: { __typename?: 'Genre', id: number, name: string, category: GenreCategory, kinkiness: number, picture: string, validAsRoot: boolean, validAsFetish: boolean, fetishMovies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined, movies?: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> | null | undefined, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number }> } | null | undefined };

export type CreateGenreMutationVariables = Exact<{
  data: GenreCreateInput;
}>;


export type CreateGenreMutation = { __typename?: 'Mutation', createGenre?: { __typename?: 'Genre', id: number, name: string } | null | undefined };

export type GenresListQueryVariables = Exact<{
  filter?: Maybe<GenreFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GenresListQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number }> };

export type GenresCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresCountQuery = { __typename?: 'Query', genresCount: number };

export type HomepageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomepageQuery = { __typename?: 'Query', movieCount: { __typename?: 'MovieCountResponse', all: number, untouched: number }, randomMovies: Array<{ __typename?: 'Movie', id: number, title: string, coverPicture?: { __typename?: 'Screencap', src: string } | null | undefined }>, recentMovies: Array<{ __typename?: 'Movie', id: number, title: string, coverPicture?: { __typename?: 'Screencap', src: string } | null | undefined }>, settings: { __typename?: 'Settings', id: number, pinnedFetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> } };

export type PinnedFetishesQueryVariables = Exact<{
  fetishIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type PinnedFetishesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: number, title: string, coverPicture?: { __typename?: 'Screencap', src: string } | null | undefined }> };

export type GenreActionCardFragment = { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> };

export type MovieDetailFragment = { __typename?: 'Movie', id: number, title: string, path: string, videoUrl: string, cover: number, website?: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined } | null | undefined, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean, index: number }>, volume?: { __typename?: 'Volume', name: string } | null | undefined, actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }>, metaData?: { __typename?: 'MovieMetadata', durationSeconds: number, sizeInMB: number, minutes: number, seconds: number, quality: Quality, format: Format, fps: number } | null | undefined, genres: Array<{ __typename?: 'GenreDefinition', timeStart: number, genre: { __typename?: 'GenreLink', parent: { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> }, children: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> }> } }>, fetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> };

export type ConvertMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type ConvertMovieMutation = { __typename?: 'Mutation', convertMovie?: boolean | null | undefined };

export type DeleteMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: { __typename?: 'Movie', id: number } | null | undefined };

export type WebsiteDetectionFragment = { __typename?: 'WebsiteDetection', id: number, content: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined } };

export type ExtractedMovieInformationFragment = { __typename?: 'ExtractedMovieInformation', tokens: Array<{ __typename?: 'Token', token: string, detection?: number | null | undefined }>, detections: Array<{ __typename?: 'ActressDetection', id: number, content: { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined } } | { __typename?: 'WebsiteDetection', id: number, content: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined } }> };

export type ExtractMovieInformationMutationVariables = Exact<{
  movieTitle: Scalars['String'];
}>;


export type ExtractMovieInformationMutation = { __typename?: 'Mutation', extractMovieInformation: { __typename?: 'ExtractedMovieInformation', tokens: Array<{ __typename?: 'Token', token: string, detection?: number | null | undefined }>, detections: Array<{ __typename?: 'ActressDetection', id: number, content: { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined } } | { __typename?: 'WebsiteDetection', id: number, content: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined } }> } };

export type UpdateGenreDefinitionsMutationVariables = Exact<{
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput> | GenreDefinitionInput;
}>;


export type UpdateGenreDefinitionsMutation = { __typename?: 'Mutation', updateGenreDefinitions?: { __typename?: 'Movie', id: number } | null | undefined };

export type UpdateMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
  input: UpdateMovieInput;
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie?: { __typename?: 'Movie', id: number } | null | undefined };

export type FindActressQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindActressQuery = { __typename?: 'Query', actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }> };

export type FindGenreQueryVariables = Exact<{
  name: Scalars['String'];
  fetish?: Maybe<Scalars['Boolean']>;
}>;


export type FindGenreQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> }> };

export type MovieDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieDetailQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: number, title: string, path: string, videoUrl: string, cover: number, website?: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined } | null | undefined, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean, index: number }>, volume?: { __typename?: 'Volume', name: string } | null | undefined, actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }>, metaData?: { __typename?: 'MovieMetadata', durationSeconds: number, sizeInMB: number, minutes: number, seconds: number, quality: Quality, format: Format, fps: number } | null | undefined, genres: Array<{ __typename?: 'GenreDefinition', timeStart: number, genre: { __typename?: 'GenreLink', parent: { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> }, children: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, linkableChildren: Array<{ __typename?: 'Genre', id: number, name: string }> }> } }>, fetishes: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> } | null | undefined };

export type MovieFilter_ActressMovieFilter_Fragment = { __typename: 'ActressMovieFilter', actress: { __typename?: 'Actress', id: number, name: string } };

export type MovieFilter_FetishMovieFilter_Fragment = { __typename: 'FetishMovieFilter', genre: { __typename?: 'Genre', id: number, name: string, picture: string } };

export type MovieFilter_TitleMovieFilter_Fragment = { __typename: 'TitleMovieFilter', title: string };

export type MovieFilter_UntouchedMovieFilter_Fragment = { __typename: 'UntouchedMovieFilter', untouched: boolean };

export type MovieFilter_WebsiteMovieFilter_Fragment = { __typename: 'WebsiteMovieFilter', website: { __typename?: 'Website', id: number, name: string, picture?: string | null | undefined } };

export type MovieFilterFragment = MovieFilter_ActressMovieFilter_Fragment | MovieFilter_FetishMovieFilter_Fragment | MovieFilter_TitleMovieFilter_Fragment | MovieFilter_UntouchedMovieFilter_Fragment | MovieFilter_WebsiteMovieFilter_Fragment;

export type MovieFilterDisplayQueryVariables = Exact<{
  genres?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  genreLimit: Scalars['Int'];
  actresses?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  actressLimit: Scalars['Int'];
  websites?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  websiteLimit: Scalars['Int'];
}>;


export type MovieFilterDisplayQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number }>, actresses: Array<{ __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined }>, websites: Array<{ __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined }> };

export type MovieFiltersQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type MovieFiltersQuery = { __typename?: 'Query', movieFilters: Array<{ __typename: 'ActressMovieFilter', actress: { __typename?: 'Actress', id: number, name: string, picture?: string | null | undefined } } | { __typename: 'FetishMovieFilter', genre: { __typename?: 'Genre', id: number, name: string, picture: string } } | { __typename: 'TitleMovieFilter', title: string } | { __typename: 'UntouchedMovieFilter', untouched: boolean } | { __typename: 'WebsiteMovieFilter', website: { __typename?: 'Website', id: number, name: string, picture?: string | null | undefined } }> };

export type MovieListQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  filter?: Maybe<MovieFilterInput>;
}>;


export type MovieListQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: number, title: string, coverPicture?: { __typename?: 'Screencap', src: string } | null | undefined }> };

export type MovieCountQueryVariables = Exact<{ [key: string]: never; }>;


export type MovieCountQuery = { __typename?: 'Query', movieCount: { __typename?: 'MovieCountResponse', all: number } };

export type FetishesQueryVariables = Exact<{
  name: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type FetishesQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string, picture: string }> };

export type TaskFragment = { __typename?: 'Task', id: number, status: TaskStatus, statusMessage?: string | null | undefined, category: string, parameters?: string | null | undefined };

export type ScanLibraryMutationVariables = Exact<{ [key: string]: never; }>;


export type ScanLibraryMutation = { __typename?: 'Mutation', scanLibrary?: boolean | null | undefined };

export type TakeAllScreencapsMutationVariables = Exact<{ [key: string]: never; }>;


export type TakeAllScreencapsMutation = { __typename?: 'Mutation', takeAllScreencaps?: boolean | null | undefined };

export type RestartTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type RestartTaskMutation = { __typename?: 'Mutation', restartTask?: { __typename?: 'Task', id: number } | null | undefined };

export type RestartTasksMutationVariables = Exact<{
  taskIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type RestartTasksMutation = { __typename?: 'Mutation', restartTasks: number };

export type CancelTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type CancelTaskMutation = { __typename?: 'Mutation', cancelTask?: boolean | null | undefined };

export type CancelTasksMutationVariables = Exact<{
  taskIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CancelTasksMutation = { __typename?: 'Mutation', cancelTasks: number };

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: number, status: TaskStatus, statusMessage?: string | null | undefined, category: string, parameters?: string | null | undefined }> };

export type WebsiteDetailFragment = { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number } | null | undefined, movies: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> };

export type UpdateWebsiteMutationVariables = Exact<{
  websiteId: Scalars['Int'];
  data: UpdateWebsiteInput;
}>;


export type UpdateWebsiteMutation = { __typename?: 'Mutation', updateWebsite?: { __typename?: 'Website', id: number } | null | undefined };

export type WebsiteDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WebsiteDetailQuery = { __typename?: 'Query', website?: { __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string, category: GenreCategory, kinkiness: number } | null | undefined, movies: Array<{ __typename?: 'Movie', id: number, title: string, screencaps: Array<{ __typename?: 'Screencap', src: string, cover: boolean }> }> } | null | undefined };

export type CreateWebsiteMutationVariables = Exact<{
  data: CreateWebsiteInput;
}>;


export type CreateWebsiteMutation = { __typename?: 'Mutation', createWebsite?: { __typename?: 'Website', id: number, name: string } | null | undefined };

export type WebsitesListQueryVariables = Exact<{
  filter?: Maybe<WebsiteFilter>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type WebsitesListQuery = { __typename?: 'Query', websites: Array<{ __typename?: 'Website', id: number, name: string, url: string, picture?: string | null | undefined, fetish?: { __typename?: 'Genre', id: number, name: string, picture: string } | null | undefined }> };

export type WebsitesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type WebsitesCountQuery = { __typename?: 'Query', websitesCount: number };

export type SetupStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SetupStatusQuery = { __typename?: 'Query', setupStatus: SetupStatus };
