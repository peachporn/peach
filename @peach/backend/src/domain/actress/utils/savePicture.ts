import { getActressImagePath } from '@peach/domain';
import { downloadImage, extension } from '@peach/utils';
import path from 'path';

export const savePicture = async (id: number, picture: string) => {
  const actressImagePath = await getActressImagePath();

  if (!picture) {
    return Promise.resolve();
  }

  if (!actressImagePath) {
    return Promise.reject(
      new Error('Tried saving actress picture, but no actressImagePath was configured!'),
    );
  }

  const ext = extension(picture);

  if (ext !== 'jpg') {
    return Promise.reject(new Error(`Only .jpg images are supported, but found: ${ext}`));
  }

  return downloadImage(picture, path.join(actressImagePath as string, `${id}.${ext}`));
};
