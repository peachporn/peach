import { head, last } from 'ramda';
import axios from 'axios';

export const extension = (imageUrl: string) => {
  const ext = last(imageUrl.split('.'));
  if (!ext) {
    return undefined;
  }

  return head(ext.split('?'));
};

export const downloadImage = (url: string): Promise<Buffer> =>
  axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data);
