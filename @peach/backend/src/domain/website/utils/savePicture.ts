import { getWebsiteImagePath } from '@peach/domain';
import { downloadImage, extension } from '@peach/utils';
import path from 'path';

export const savePicture = async (id: number, picture: string) => {
  const websiteImagePath = await getWebsiteImagePath();

  if (!picture) {
    return Promise.resolve();
  }

  if (!websiteImagePath) {
    return Promise.reject(
      new Error('Tried saving website picture, but no websiteImagePath was configured!'),
    );
  }

  const ext = extension(picture);

  if (ext !== 'jpg') {
    return Promise.reject(new Error(`Only .jpg images are supported, but found: ${ext}`));
  }

  return downloadImage(picture, path.join(websiteImagePath as string, `${id}.${ext}`));
};
