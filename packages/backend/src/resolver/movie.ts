import { Resolvers } from '../generated/resolver-types';
import { Format, Quality } from '../generated/types';

export const resolver: Resolvers = {
  Query: {
    movie: () => ({
      id: '',
      title: '',
      metaData: {
        quality: Quality.Uhd,
        format: Format.Mp4,
        fps: 60,
        minutes: 60,
        seconds: 0,
        size: 5000,
      },
    }),
  },
};
