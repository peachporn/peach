import path from 'path';
import { ScrapedActress } from '../../scrapers/actress/type';
import { geocodeLocation } from '../../utils/location';
import { getActressImagePath } from '../../domain/settings';
import { downloadImage, extension } from '../../utils/download-image';

const resolveLocation = async (actress: ScrapedActress) => {
  const location = await geocodeLocation(actress.country, actress.province, actress.city);

  return {
    ...(!location
      ? {}
      : {
          longitude: location.longitude,
          latitude: location.latitude,
        }),
  };
};

const savePicture = async (id: number, actress: ScrapedActress) => {
  const actressImagePath = await getActressImagePath();

  if (!actress.picture) {
    return Promise.resolve();
  }

  if (!actressImagePath) {
    return Promise.reject(
      new Error('Tried saving actress picture, but no actressImagePath was configured!'),
    );
  }

  const ext = extension(actress.picture);

  if (ext !== 'jpg') {
    return Promise.reject(new Error(`Only .jpg images are supported, but found: ${ext}`));
  }

  return downloadImage(actress.picture, path.join(actressImagePath as string, `${id}.${ext}`));
};

export const postProcessActress = async (id: number, actress: ScrapedActress) => {
  const location = await resolveLocation(actress);

  await savePicture(id, actress);

  return {
    ...actress,
    ...location,
  };
};
