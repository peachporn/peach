import { useMutation } from '@apollo/client';
import {
  ExtractedMovieInformationFragment,
  MovieDetailFragment,
  UpdateMovieMutation,
  UpdateMovieMutationVariables,
} from '@peach/types';
import { h } from 'preact';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { head, uniq } from 'ramda';
import { createContext } from '../../../utils/createContext';
import { usePrevious } from '../../../utils/usePrevious';
import { updateMovieMutation } from '../mutations/updateMovie.gql';
import { ExtractionResult, useExtractMovieInformation } from './useExtractMovieInformation';

export const [useMovieFormContext, MovieFormContext] = createContext<{
  originalMovie: MovieDetailFragment;
  isDirty: boolean;
  submit: () => Promise<unknown>;

  title: string;
  setTitle: (title: string) => void;

  cover: number;
  setCover: (cover: number) => void;

  websiteId: number | undefined;
  setWebsiteId: (websiteId: number | undefined) => void;

  actressIds: number[];
  setActressIds: (actressIds: number[]) => void;

  fetishIds: number[];
  setFetishIds: (actressIds: number[]) => void;

  clipboard: string;
  setClipboard: (clipboard: string) => void;

  websiteSearchTerm: string;
  setWebsiteSearchTerm: (term: string) => void;

  actressSearchTerm: string;
  setActressSearchTerm: (term: string) => void;

  extractionResult: ExtractionResult | undefined;
  extractionFetchResult: ExtractedMovieInformationFragment | undefined;
  extractMovieInformation: () => Promise<unknown>;
}>();

export const MovieFormProvider: FunctionalComponent<{
  movie: MovieDetailFragment;
  onSubmit: () => Promise<unknown>;
}> = ({ movie: originalMovie, onSubmit, children }) => {
  const [title, setTitle] = useState<string>(originalMovie.title);
  const previousTitle = usePrevious(title);

  const [cover, setCover] = useState<number>(originalMovie.cover);
  const previousCover = usePrevious(cover);

  const [websiteId, setWebsiteId] = useState<number | undefined>(originalMovie.website?.id);
  const previousWebsite = usePrevious(websiteId);

  const [actressIds, setActressIds] = useState<number[]>(originalMovie.actresses.map(a => a.id));
  const previousActresses = usePrevious(actressIds);

  const [fetishIds, setFetishIds] = useState<number[]>(originalMovie.fetishes.map(a => a.id));
  const previousFetishes = usePrevious(fetishIds);

  const [clipboard, setClipboard] = useState('');
  const [websiteSearchTerm, setWebsiteSearchTerm] = useState('');
  const [actressSearchTerm, setActressSearchTerm] = useState('');

  const { extractionResult, extractionFetchResult, extractMovieInformation } =
    useExtractMovieInformation(title);

  useEffect(() => {
    setActressIds(uniq([...(extractionResult.actresses ?? []), ...actressIds]));
    setFetishIds(uniq([...(extractionResult.fetish ?? []), ...fetishIds]));
    setWebsiteId(extractionResult.website?.[0]);
  }, [extractionResult]);

  const isDirty = [
    previousTitle,
    previousCover,
    previousWebsite,
    previousActresses,
    previousFetishes,
  ].some(x => x !== undefined);

  const [updateMovie] = useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(
    updateMovieMutation,
  );

  const submit = () =>
    updateMovie({
      variables: {
        movieId: originalMovie.id,
        input: {
          title,
          cover,
          website: websiteId,
          actresses: actressIds,
          fetishes: fetishIds,
        },
      },
    }).then(onSubmit);

  return (
    <MovieFormContext.Provider
      value={{
        originalMovie,

        title,
        setTitle,

        cover,
        setCover,

        websiteId,
        setWebsiteId,

        actressIds,
        setActressIds,

        fetishIds,
        setFetishIds,

        isDirty,
        submit,

        clipboard,
        setClipboard,

        websiteSearchTerm,
        setWebsiteSearchTerm,

        actressSearchTerm,
        setActressSearchTerm,

        extractionResult,
        extractionFetchResult,
        extractMovieInformation,
      }}
    >
      {children}
    </MovieFormContext.Provider>
  );
};
