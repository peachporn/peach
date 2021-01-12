type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Actress = {
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

type ActressCreateInput = {
  name: Scalars['String'];
};

type ActressFilter = {
  name?: Maybe<Scalars['String']>;
};

type ActressUpdateInput = {
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

type Boobs = 'Natural' | 'Fake';

type Cupsize =
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

type Ethnicity = 'Caucasian' | 'Asian' | 'Latina' | 'Ebony' | 'NativeAmerican' | 'Indian';

type Eyecolor = 'Green' | 'Blue' | 'Brown' | 'Hazel' | 'Grey' | 'Other';

type Format = 'mp4' | 'wmv';

type Genre = {
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

type GenreCategory =
  | 'Position'
  | 'Location'
  | 'Clothing'
  | 'Practice'
  | 'Film'
  | 'Feature'
  | 'BodyPart';

type GenreCreateInput = {
  name: Scalars['String'];
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  validAsRoot: Scalars['Boolean'];
  validAsFetish: Scalars['Boolean'];
};

type GenreDefinition = {
  __typename?: 'GenreDefinition';
  id: Scalars['Int'];
  timeStart: Scalars['Float'];
  genre: GenreLink;
};

type GenreDefinitionInput = {
  timeStart: Scalars['Float'];
  genre: GenreLinkInput;
};

type GenreFilter = {
  name?: Maybe<Scalars['String']>;
  fetish?: Maybe<Scalars['Boolean']>;
  category?: Maybe<GenreCategory>;
};

type GenreLink = {
  __typename?: 'GenreLink';
  parent: Genre;
  children: Array<Genre>;
};

type GenreLinkInput = {
  parent: Scalars['Int'];
  children: Array<Scalars['Int']>;
};

type GeoLocation = {
  __typename?: 'GeoLocation';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

type Haircolor = 'Blonde' | 'Brunette' | 'Black' | 'Red' | 'Auburn' | 'Other';

type InferMovieTitle = 'FOLDER' | 'FILENAME';

type Language = 'EN';

type Measurements = {
  __typename?: 'Measurements';
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

type MeasurementsInput = {
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  url: Scalars['String'];
  title: Scalars['String'];
  actresses: Array<Actress>;
  actors: Scalars['Int'];
  volume?: Maybe<Volume>;
  metaData?: Maybe<MovieMetadata>;
  path: Scalars['String'];
  screencaps: Array<Screencap>;
  cover: Scalars['Int'];
  genres: Array<GenreDefinition>;
  fetishes: Array<Genre>;
};

type MovieFromFileInput = {
  title: Scalars['String'];
  location: MovieLocation;
  actors?: Maybe<Scalars['Int']>;
};

type MovieListMovie = {
  __typename?: 'MovieListMovie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  screencaps: Array<Screencap>;
  cover: Scalars['Int'];
};

type MovieLocation = {
  volumeName: Scalars['String'];
  filePath: Scalars['String'];
};

type MovieMetadata = {
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

type MoviesFilter = {
  fetishes?: Maybe<Array<Scalars['Int']>>;
};

type MovieUpdateInput = {
  cover?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

type Mutation = {
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
  saveVolumes: Array<Volume>;
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

type MutationAddActressToMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type MutationAddSubgenreArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};

type MutationCancelTaskArgs = {
  taskId: Scalars['Int'];
};

type MutationCancelTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};

type MutationCreateActressArgs = {
  actress: ActressCreateInput;
};

type MutationCreateGenreArgs = {
  genreInput: GenreCreateInput;
};

type MutationCreateMovieFromFileArgs = {
  input: MovieFromFileInput;
};

type MutationDeleteGenreArgs = {
  genreId: Scalars['Int'];
};

type MutationDeleteMovieArgs = {
  movieId: Scalars['Int'];
};

type MutationRemoveActressFromMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type MutationRemoveSubgenreArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};

type MutationRestartTaskArgs = {
  taskId: Scalars['Int'];
};

type MutationRestartTasksArgs = {
  taskIds: Array<Scalars['Int']>;
};

type MutationSaveVolumesArgs = {
  input: SaveVolumesInput;
};

type MutationScrapeActressArgs = {
  id: Scalars['Int'];
};

type MutationSetMovieFetishesArgs = {
  movieId: Scalars['Int'];
  genreIds: Array<Scalars['Int']>;
};

type MutationUpdateActressArgs = {
  actressId: Scalars['Int'];
  data: ActressUpdateInput;
};

type MutationUpdateGenreArgs = {
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
};

type MutationUpdateGenreDefinitionsArgs = {
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput>;
};

type MutationUpdateMovieArgs = {
  movieId: Scalars['Int'];
  data: MovieUpdateInput;
};

type MutationUpdateSettingsArgs = {
  data: UpdateSettingsInput;
};

type Quality = 'SD' | 'HD' | 'FullHD' | 'UHD';

type Query = {
  __typename?: 'Query';
  actress?: Maybe<Actress>;
  actresses: Array<Actress>;
  actressesCount: Scalars['Int'];
  genre?: Maybe<Genre>;
  genres: Array<Genre>;
  genresCount: Scalars['Int'];
  movie?: Maybe<Movie>;
  movieCount: Scalars['Int'];
  movies: Array<MovieListMovie>;
  pathExists?: Maybe<Scalars['Boolean']>;
  randomMovie: Movie;
  settings: Settings;
  setupStatus: SetupStatus;
  tasks: Array<Task>;
  volumes: Array<Volume>;
};

type QueryActressArgs = {
  id: Scalars['Int'];
};

type QueryActressesArgs = {
  filter?: Maybe<ActressFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

type QueryActressesCountArgs = {
  filter?: Maybe<ActressFilter>;
};

type QueryGenreArgs = {
  id: Scalars['Int'];
};

type QueryGenresArgs = {
  filter?: Maybe<GenreFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

type QueryGenresCountArgs = {
  filter?: Maybe<GenreFilter>;
};

type QueryMovieArgs = {
  id: Scalars['Int'];
};

type QueryMoviesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  filter?: Maybe<MoviesFilter>;
};

type QueryPathExistsArgs = {
  path: Scalars['String'];
};

type SaveVolumesInput = {
  volumes: Array<VolumeInput>;
};

type Screencap = {
  __typename?: 'Screencap';
  index: Scalars['Int'];
  cover: Scalars['Boolean'];
  src: Scalars['String'];
};

type Settings = {
  __typename?: 'Settings';
  language: Language;
  inferMovieTitle: InferMovieTitle;
  actressImagePath?: Maybe<Scalars['String']>;
  genreImagePath?: Maybe<Scalars['String']>;
  screencapPath?: Maybe<Scalars['String']>;
  volumes: Array<Volume>;
};

type SetupStatus = 'Complete' | 'NoVolumes';

type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  category: Scalars['String'];
  status: TaskStatus;
  parameters?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

type TaskStatus = 'RUNNING' | 'PENDING' | 'ERROR';

type UpdateGenreInput = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<GenreCategory>;
  validAsRoot?: Maybe<Scalars['Boolean']>;
  kinkiness?: Maybe<Scalars['Int']>;
};

type UpdateSettingsInput = {
  language?: Maybe<Language>;
  inferMovieTitle?: Maybe<InferMovieTitle>;
  actressImagePath?: Maybe<Scalars['String']>;
  genreImagePath?: Maybe<Scalars['String']>;
  screencapPath?: Maybe<Scalars['String']>;
};

type Volume = {
  __typename?: 'Volume';
  name: Scalars['String'];
  path: Scalars['String'];
};

type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

type CreateActressMutationVariables = {
  name: Scalars['String'];
};

type CreateActressMutation = {
  __typename?: 'Mutation';
  createActress?: Maybe<{ __typename?: 'Actress'; id: number; name: string }>;
};

type CreateGenreMutationVariables = {
  data: GenreCreateInput;
};

type CreateGenreMutation = {
  __typename?: 'Mutation';
  createGenre?: Maybe<{ __typename?: 'Genre'; id: number; name: string }>;
};

type DeleteGenreMutationVariables = {
  genreId: Scalars['Int'];
};

type DeleteGenreMutation = {
  __typename?: 'Mutation';
  deleteGenre?: Maybe<{ __typename?: 'Genre'; id: number }>;
};

type DeleteMovieMutationVariables = {
  movieId: Scalars['Int'];
};

type DeleteMovieMutation = {
  __typename?: 'Mutation';
  deleteMovie?: Maybe<{ __typename?: 'Movie'; id: number }>;
};

type SaveVolumesMutationVariables = {
  input: SaveVolumesInput;
};

type SaveVolumesMutation = {
  __typename?: 'Mutation';
  saveVolumes: Array<{ __typename?: 'Volume'; name: string; path: string }>;
};

type ScanLibraryMutationVariables = {};

type ScanLibraryMutation = { __typename?: 'Mutation'; scanLibrary?: Maybe<boolean> };

type ScrapeActressMutationVariables = {
  id: Scalars['Int'];
};

type ScrapeActressMutation = { __typename?: 'Mutation'; scrapeActress?: Maybe<boolean> };

type TakeAllScreencapsMutationVariables = {};

type TakeAllScreencapsMutation = { __typename?: 'Mutation'; takeAllScreencaps?: Maybe<boolean> };

type RestartTaskMutationVariables = {
  taskId: Scalars['Int'];
};

type RestartTaskMutation = {
  __typename?: 'Mutation';
  restartTask?: Maybe<{ __typename?: 'Task'; id: number }>;
};

type RestartTasksMutationVariables = {
  taskIds: Array<Scalars['Int']>;
};

type RestartTasksMutation = { __typename?: 'Mutation'; restartTasks: number };

type CancelTaskMutationVariables = {
  taskId: Scalars['Int'];
};

type CancelTaskMutation = { __typename?: 'Mutation'; cancelTask?: Maybe<boolean> };

type CancelTasksMutationVariables = {
  taskIds: Array<Scalars['Int']>;
};

type CancelTasksMutation = { __typename?: 'Mutation'; cancelTasks: number };

type UpdateActressMutationVariables = {
  actressId: Scalars['Int'];
  data: ActressUpdateInput;
};

type UpdateActressMutation = {
  __typename?: 'Mutation';
  updateActress?: Maybe<{ __typename?: 'Actress'; id: number }>;
};

type UpdateGenreMutationVariables = {
  genreId: Scalars['Int'];
  data: UpdateGenreInput;
};

type UpdateGenreMutation = {
  __typename?: 'Mutation';
  updateGenre?: Maybe<{ __typename?: 'Genre'; id: number }>;
};

type AddSubgenreMutationVariables = {
  parentId: Scalars['Int'];
  childId: Scalars['Int'];
};

type AddSubgenreMutation = {
  __typename?: 'Mutation';
  addSubgenre?: Maybe<{
    __typename?: 'Genre';
    id: number;
    name: string;
    category: GenreCategory;
    picture: string;
  }>;
};

type RemoveSubgenreMutationVariables = {
  parentId: Scalars['Int'];
  childId: Scalars['Int'];
};

type RemoveSubgenreMutation = {
  __typename?: 'Mutation';
  removeSubgenre?: Maybe<{ __typename?: 'Genre'; id: number }>;
};

type UpdateGenreDefinitionsMutationVariables = {
  movieId: Scalars['Int'];
  genreDefinitions: Array<GenreDefinitionInput>;
};

type UpdateGenreDefinitionsMutation = {
  __typename?: 'Mutation';
  updateGenreDefinitions?: Maybe<{ __typename?: 'Movie'; id: number }>;
};

type UpdateCoverMutationVariables = {
  movieId: Scalars['Int'];
  cover: Scalars['Int'];
};

type UpdateCoverMutation = {
  __typename?: 'Mutation';
  updateMovie?: Maybe<{
    __typename?: 'Movie';
    screencaps: Array<{ __typename?: 'Screencap'; index: number; cover: boolean }>;
  }>;
};

type UpdateTitleMutationVariables = {
  movieId: Scalars['Int'];
  title: Scalars['String'];
};

type UpdateTitleMutation = {
  __typename?: 'Mutation';
  updateMovie?: Maybe<{ __typename?: 'Movie'; title: string }>;
};

type AddActressToMovieMutationVariables = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type AddActressToMovieMutation = {
  __typename?: 'Mutation';
  addActressToMovie?: Maybe<{
    __typename?: 'Movie';
    actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
  }>;
};

type RemoveActressFromMovieMutationVariables = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type RemoveActressFromMovieMutation = {
  __typename?: 'Mutation';
  removeActressFromMovie?: Maybe<{
    __typename?: 'Movie';
    actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
  }>;
};

type SetMovieFetishesMutationVariables = {
  movieId: Scalars['Int'];
  genreIds: Array<Scalars['Int']>;
};

type SetMovieFetishesMutation = {
  __typename?: 'Mutation';
  setMovieFetishes?: Maybe<{
    __typename?: 'Movie';
    fetishes: Array<{ __typename?: 'Genre'; name: string }>;
  }>;
};

type UpdateSettingsMutationVariables = {
  data: UpdateSettingsInput;
};

type UpdateSettingsMutation = {
  __typename?: 'Mutation';
  updateSettings: {
    __typename?: 'Settings';
    language: Language;
    inferMovieTitle: InferMovieTitle;
    screencapPath?: Maybe<string>;
    actressImagePath?: Maybe<string>;
    genreImagePath?: Maybe<string>;
  };
};

type ActressQueryVariables = {
  id: Scalars['Int'];
};

type ActressQuery = {
  __typename?: 'Query';
  actress?: Maybe<{
    __typename?: 'Actress';
    id: number;
    name: string;
    picture?: Maybe<string>;
    aliases: Array<string>;
    haircolor?: Maybe<Haircolor>;
    eyecolor?: Maybe<Eyecolor>;
    ethnicity?: Maybe<Ethnicity>;
    dateOfBirth?: Maybe<string>;
    dateOfCareerstart?: Maybe<string>;
    dateOfRetirement?: Maybe<string>;
    dateOfDeath?: Maybe<string>;
    inBusiness?: Maybe<boolean>;
    country?: Maybe<string>;
    province?: Maybe<string>;
    city?: Maybe<string>;
    boobs?: Maybe<Boobs>;
    piercings?: Maybe<string>;
    tattoos?: Maybe<string>;
    height?: Maybe<number>;
    weight?: Maybe<number>;
    cupsize?: Maybe<Cupsize>;
    socialMediaLinks?: Maybe<Array<Maybe<string>>>;
    officialWebsite?: Maybe<string>;
    location?: Maybe<{ __typename?: 'GeoLocation'; latitude: number; longitude: number }>;
    measurements?: Maybe<{
      __typename?: 'Measurements';
      bust: number;
      hips: number;
      waist: number;
    }>;
    movies?: Maybe<
      Array<{
        __typename?: 'Movie';
        id: number;
        title: string;
        screencaps: Array<{ __typename?: 'Screencap'; src: string; index: number }>;
      }>
    >;
  }>;
};

type ActressesListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type ActressesListQuery = {
  __typename?: 'Query';
  actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
};

type ActressesCountQueryVariables = {};

type ActressesCountQuery = { __typename?: 'Query'; actressesCount: number };

type FindActressQueryVariables = {
  name: Scalars['String'];
};

type FindActressQuery = {
  __typename?: 'Query';
  actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
};

type FindGenreQueryVariables = {
  name: Scalars['String'];
  fetish?: Maybe<Scalars['Boolean']>;
};

type FindGenreQuery = {
  __typename?: 'Query';
  genres: Array<{
    __typename?: 'Genre';
    id: number;
    name: string;
    category: GenreCategory;
    picture: string;
    validAsRoot: boolean;
    validAsFetish: boolean;
    linkableChildren: Array<{ __typename?: 'Genre'; id: number }>;
  }>;
};

type GenreQueryVariables = {
  id: Scalars['Int'];
};

type GenreQuery = {
  __typename?: 'Query';
  genre?: Maybe<{
    __typename?: 'Genre';
    id: number;
    name: string;
    category: GenreCategory;
    kinkiness: number;
    picture: string;
    validAsRoot: boolean;
    linkableChildren: Array<{
      __typename?: 'Genre';
      id: number;
      name: string;
      category: GenreCategory;
      picture: string;
    }>;
  }>;
};

type GenresListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type GenresListQuery = {
  __typename?: 'Query';
  genres: Array<{
    __typename?: 'Genre';
    id: number;
    name: string;
    picture: string;
    category: GenreCategory;
  }>;
};

type GenresCountQueryVariables = {};

type GenresCountQuery = { __typename?: 'Query'; genresCount: number };

type MovieQueryVariables = {
  id: Scalars['Int'];
};

type MovieQuery = {
  __typename?: 'Query';
  movie?: Maybe<{ __typename?: 'Movie' } & MovieDetailFragment>;
};

type MovieDetailFragment = {
  __typename?: 'Movie';
  id: number;
  title: string;
  url: string;
  path: string;
  screencaps: Array<{ __typename?: 'Screencap'; src: string; index: number }>;
  volume?: Maybe<{ __typename?: 'Volume'; name: string }>;
  actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
  metaData?: Maybe<{
    __typename?: 'MovieMetadata';
    durationSeconds: number;
    sizeInMB: number;
    minutes: number;
    seconds: number;
    quality: Quality;
    format: Format;
    fps: number;
  }>;
  genres: Array<{
    __typename?: 'GenreDefinition';
    timeStart: number;
    genre: {
      __typename?: 'GenreLink';
      parent: {
        __typename?: 'Genre';
        id: number;
        name: string;
        picture: string;
        validAsRoot: boolean;
        category: GenreCategory;
        linkableChildren: Array<{ __typename?: 'Genre'; id: number }>;
      };
      children: Array<{
        __typename?: 'Genre';
        id: number;
        name: string;
        picture: string;
        validAsRoot: boolean;
        category: GenreCategory;
        linkableChildren: Array<{ __typename?: 'Genre'; id: number }>;
      }>;
    };
  }>;
  fetishes: Array<{ __typename?: 'Genre'; id: number; name: string; picture: string }>;
};

type MovieListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  filter?: Maybe<MoviesFilter>;
};

type MovieListQuery = {
  __typename?: 'Query';
  movies: Array<{
    __typename?: 'MovieListMovie';
    id: number;
    title: string;
    screencaps: Array<{ __typename?: 'Screencap'; src: string; index: number }>;
  }>;
};

type MovieCountQueryVariables = {};

type MovieCountQuery = { __typename?: 'Query'; movieCount: number };

type RandomMovieQueryVariables = {};

type RandomMovieQuery = {
  __typename?: 'Query';
  randomMovie: {
    __typename?: 'Movie';
    id: number;
    title: string;
    screencaps: Array<{ __typename?: 'Screencap'; src: string; index: number }>;
  };
};

type SettingsQueryVariables = {};

type SettingsQuery = {
  __typename?: 'Query';
  settings: {
    __typename?: 'Settings';
    language: Language;
    inferMovieTitle: InferMovieTitle;
    actressImagePath?: Maybe<string>;
    genreImagePath?: Maybe<string>;
    screencapPath?: Maybe<string>;
    volumes: Array<{ __typename?: 'Volume'; name: string; path: string }>;
  };
};

type PathExistsQueryVariables = {
  path: Scalars['String'];
};

type PathExistsQuery = { __typename?: 'Query'; pathExists?: Maybe<boolean> };

type TasksQueryVariables = {};

type TasksQuery = {
  __typename?: 'Query';
  tasks: Array<{
    __typename?: 'Task';
    id: number;
    status: TaskStatus;
    statusMessage?: Maybe<string>;
    category: string;
    parameters?: Maybe<string>;
  }>;
};

type SetupStatusQueryVariables = {};

type SetupStatusQuery = { __typename?: 'Query'; setupStatus: SetupStatus };
