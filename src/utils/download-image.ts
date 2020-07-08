import request from 'request';
import { createWriteStream } from 'fs';
import { head, last } from 'ramda';

export const extension = (imageUrl: string) => {
  const ext = last(imageUrl.split('.'));
  if (!ext) {
    return undefined;
  }

  return head(ext.split('?'));
};

export const downloadImage = (url: string, path: string) =>
  new Promise((resolve, reject) => {
    const uri = url.replace('https', 'http');

    return request.head(uri, err => {
      if (err) {
        return reject(err);
      }

      const stream = createWriteStream(path);

      stream.on('close', () => resolve());
      stream.on('error', e => reject(e));

      return request(uri).pipe(stream);
    });
  });
