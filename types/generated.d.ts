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
  piercings: Array<Scalars['String']>;
  tattoos: Array<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<Measurements>;
  cupsize?: Maybe<Cupsize>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  officialWebsite?: Maybe<Scalars['String']>;
  movies: Array<Movie>;
};

type ActressCreateInput = {
  name: Scalars['String'];
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

type Ethnicity = 'Caucasian' | 'Asian' | 'Latina' | 'Ebony' | 'Native' | 'American' | 'Indian';

type Eyecolor = 'Green' | 'Blue' | 'Brown' | 'Hazel' | 'Grey' | 'Other';

type Format = 'mp4' | 'wmv';

type GeoLocation = {
  __typename?: 'GeoLocation';
  longitude: Scalars['String'];
  latitude: Scalars['String'];
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

type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  metaData?: Maybe<MovieMetadata>;
  actors: Scalars['Int'];
  fresh: Scalars['Boolean'];
  volume?: Maybe<Volume>;
  screencaps: Array<Scalars['String']>;
  coverIndex: Scalars['Int'];
  path: Scalars['String'];
};

type MovieFromFileInput = {
  title: Scalars['String'];
  location: MovieLocation;
  actors?: Maybe<Scalars['Int']>;
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

type MovieUpdateInput = {
  cover?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  createActress: Actress;
  createMovieFromFile: Movie;
  saveVolumes: Array<Volume>;
  scanLibrary?: Maybe<Scalars['Boolean']>;
  takeAllScreencaps?: Maybe<Scalars['Boolean']>;
  updateInferMovieTitle: Settings;
  updateLanguage: Settings;
  updateMovie?: Maybe<Movie>;
  updateScreencapPath: Settings;
};

type MutationCreateActressArgs = {
  actress: ActressCreateInput;
};

type MutationCreateMovieFromFileArgs = {
  input: MovieFromFileInput;
};

type MutationSaveVolumesArgs = {
  input: SaveVolumesInput;
};

type MutationUpdateInferMovieTitleArgs = {
  inferMovieTitle?: Maybe<InferMovieTitle>;
};

type MutationUpdateLanguageArgs = {
  language?: Maybe<Language>;
};

type MutationUpdateMovieArgs = {
  movieId: Scalars['Int'];
  data: MovieUpdateInput;
};

type MutationUpdateScreencapPathArgs = {
  screencapPath: Scalars['String'];
};

type Quality = 'SD' | 'HD' | 'FullHD' | 'UHD';

type Query = {
  __typename?: 'Query';
  actresses: Array<Actress>;
  movie?: Maybe<Movie>;
  movieCount: Scalars['Int'];
  movieList: Array<Movie>;
  pathExists?: Maybe<Scalars['Boolean']>;
  randomMovie: Movie;
  settings: Settings;
  setupStatus: SetupStatus;
  volumes: Array<Volume>;
};

type QueryActressesArgs = {
  name: Scalars['String'];
};

type QueryMovieArgs = {
  id: Scalars['Int'];
};

type QueryMovieListArgs = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type QueryPathExistsArgs = {
  path: Scalars['String'];
};

type SaveVolumesInput = {
  volumes: Array<VolumeInput>;
};

type Settings = {
  __typename?: 'Settings';
  language: Language;
  volumes: Array<Volume>;
  inferMovieTitle: InferMovieTitle;
  screencapPath: Scalars['String'];
};

type SetupStatus = 'Complete' | 'NoVolumes';

type Volume = {
  __typename?: 'Volume';
  name: Scalars['String'];
  path: Scalars['String'];
};

type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

type FindActressQueryVariables = {
  name: Scalars['String'];
};

type FindActressQuery = {
  __typename?: 'Query';
  actresses: Array<{ __typename?: 'Actress'; name: string }>;
};

type MovieQueryVariables = {
  id: Scalars['Int'];
};

type MovieQuery = {
  __typename?: 'Query';
  movie?: Maybe<{
    __typename?: 'Movie';
    id: number;
    title: string;
    url: string;
    path: string;
    screencaps: Array<string>;
    coverIndex: number;
    volume?: Maybe<{ __typename?: 'Volume'; name: string }>;
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
  }>;
};

type MovieListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type MovieListQuery = {
  __typename?: 'Query';
  movieList: Array<{
    __typename?: 'Movie';
    id: number;
    title: string;
    fresh: boolean;
    screencaps: Array<string>;
    coverIndex: number;
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
    screencaps: Array<string>;
    coverIndex: number;
  };
};

type SettingsQueryVariables = {};

type SettingsQuery = {
  __typename?: 'Query';
  settings: {
    __typename?: 'Settings';
    language: Language;
    inferMovieTitle: InferMovieTitle;
    screencapPath: string;
    volumes: Array<{ __typename?: 'Volume'; name: string; path: string }>;
  };
};

type PathExistsQueryVariables = {
  path: Scalars['String'];
};

type PathExistsQuery = { __typename?: 'Query'; pathExists?: Maybe<boolean> };

type SetupStatusQueryVariables = {};

type SetupStatusQuery = { __typename?: 'Query'; setupStatus: SetupStatus };
