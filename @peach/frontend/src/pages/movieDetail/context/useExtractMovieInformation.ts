import { useState } from 'preact/hooks';
import {
  ExtractedMovieInformationFragment,
  ExtractMovieInformationMutation,
  ExtractMovieInformationMutationVariables,
  WebsiteDetectionFragment,
} from '@peach/types';
import { useMutation } from '@apollo/client';
import { extractMovieInformationMutation } from '../mutations/extractMovieInformation.gql';

export type ExtractionResult = {
  website: number[] | undefined;
  fetish: number[] | undefined;
  actresses: number[] | undefined;
};

export const useExtractMovieInformation = (title: string) => {
  const [extractionFetchResult, setExtractionResult] = useState<
    ExtractedMovieInformationFragment | undefined
  >(undefined);

  const [callExtractMovieInformationMutation] = useMutation<
    ExtractMovieInformationMutation,
    ExtractMovieInformationMutationVariables
  >(extractMovieInformationMutation);

  const extractMovieInformation = () =>
    callExtractMovieInformationMutation({ variables: { movieTitle: title } }).then(response => {
      const r = response?.data?.extractMovieInformation;
      if (!r) return;
      setExtractionResult(r);
    });

  const detectedActresses = extractionFetchResult?.detections
    .filter(d => d.__typename === 'ActressDetection')
    .map(d => d.content);

  const detectedWebsite = extractionFetchResult?.detections.find(
    d => d.__typename === 'WebsiteDetection',
  )?.content as WebsiteDetectionFragment['content'] | undefined;

  const extractionResult: ExtractionResult = {
    website: detectedWebsite ? [detectedWebsite.id] : undefined,
    fetish: detectedWebsite && detectedWebsite.fetish ? [detectedWebsite.fetish.id] : undefined,
    actresses: detectedActresses?.length ? detectedActresses?.map(a => a.id) : undefined,
  };

  return {
    extractMovieInformation,
    extractionFetchResult,
    extractionResult,
  };
};
