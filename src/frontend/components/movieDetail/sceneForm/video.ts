import { PropRef } from 'preact/hooks';

export const scrub = (offset: number, video: PropRef<HTMLVideoElement>) => {
  if (video.current) {
    // eslint-disable-next-line no-param-reassign
    video.current.currentTime += offset;
  }
};

export const jumpToTime = (time: number, video: PropRef<HTMLVideoElement>) => {
  if (video.current) {
    // eslint-disable-next-line no-param-reassign
    video.current.currentTime = time;
  }
};

export const playPause = (video: PropRef<HTMLVideoElement>) => {
  if (video.current) {
    if (video.current.paused) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }
};

export const pause = (video: PropRef<HTMLVideoElement>) => {
  if (video.current) {
    video.current.pause();
  }
};
