import { geocode } from '@esri/arcgis-rest-geocoding';
import { setDefaultRequestOptions } from '@esri/arcgis-rest-request';
import fetch from 'node-fetch';

// @ts-ignore
setDefaultRequestOptions({ fetch });

export const geocodeLocation = (
  countryCode?: string,
  province?: string,
  city?: string,
): Promise<{ latitude: number; longitude: number } | null> =>
  geocode({
    address: `${city || ''}${city ? ', ' : ''}${province || ''}`,
    countryCode,
  }).then(({ candidates }) =>
    !candidates.length
      ? null
      : {
          latitude: candidates[0].location.x,
          longitude: candidates[0].location.y,
        },
  );
