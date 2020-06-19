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
    if (extension(url) !== extension(path)) {
      reject(new Error('Extensions to not match!'));
    }
    const uri = url.replace('https', 'http');

    request.head(uri, err => {
      if (err) {
        return reject(err);
      }
      return request(uri).pipe(createWriteStream(path).on('close', () => resolve()));
    });
  });
