import { useState } from 'preact/hooks';
import {
  ExtractedMovieInformationFragment,
  ExtractMovieInformationMutation,
  ExtractMovieInformationMutationVariables,
} from '@peach/types';
import { useMutation } from '@apollo/client';
import { extractMovieInformationMutation } from '../mutations/extractMovieInformation.gql';

type UseMovieInformationExtractorProps = {
  movieTitle: string;
};

export const useMovieInformationExtractor = ({ movieTitle }: UseMovieInformationExtractorProps) => {
  const [clipboard, setClipboard] = useState('');
  const [websiteSearchName, setWebsiteSearchName] = useState('');
  const [actressSearchName, setActressSearchName] = useState('');

  const [extractionFetchResult, setExtractionResult] = useState<
    ExtractedMovieInformationFragment | undefined
  >(undefined);
  const [callExtractMovieInformationMutation] = useMutation<
    ExtractMovieInformationMutation,
    ExtractMovieInformationMutationVariables
  >(extractMovieInformationMutation);

  const extractMovieInformation = () =>
    callExtractMovieInformationMutation({ variables: { movieTitle } }).then(response => {
      const r = response?.data?.extractMovieInformation;
      if (!r) return;
      setExtractionResult(r);
    });

  const detectedActresses = extractionFetchResult?.detections
    .filter(d => d.__typename === 'ActressDetection')
    .map(d => d.content);

  const detectedWebsite = extractionFetchResult?.detections.find(
    d => d.__typename === 'WebsiteDetection',
  )?.content;

  const extractionResult = {
    website: detectedWebsite ? [detectedWebsite.id] : undefined,
    actresses: detectedActresses?.length ? detectedActresses?.map(a => a.id) : undefined,
  };

  return {
    extractMovieInformation,
    extractionFetchResult,

    clipboard,
    setClipboard,

    websiteSearchName,
    setWebsiteSearchName,
    actressSearchName,
    setActressSearchName,

    extractionResult,
  };
};
