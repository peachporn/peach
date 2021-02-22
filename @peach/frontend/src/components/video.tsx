import { h, RefObject } from 'preact';
import { compose } from 'ramda';
import { useState } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

type VideoSrc = {
  [type: string]: string;
};

export type VideoProps = {
  src: VideoSrc;
  ref: RefObject<HTMLVideoElement>;
};

const sources = (src: VideoSrc) =>
  Object.keys(src).map(sourceType => <source type={sourceType} src={src[sourceType]} />);

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src }, video) => {
  const [touchPosition, setTouchPosition] = useState(0);

  const startScrub = (e: TouchEvent) => setTouchPosition(e.touches[0].clientX);
  const resetTouchPosition = () => setTouchPosition(0);

  const scrub = (e: TouchEvent) => {
    if (!video.current) {
      return;
    }

    const current = video.current.currentTime;
    const newTouchPosition = e.changedTouches[0].clientX;
    const scrubTime = newTouchPosition - touchPosition;
    if (Math.abs(scrubTime) < 0.15) {
      if (video.current.paused) {
        video.current.play();
      } else {
        video.current.pause();
      }
    }

    setTouchPosition(newTouchPosition);
    // eslint-disable-next-line no-param-reassign
    video.current.currentTime = current + scrubTime;
  };

  return (
    <video
      className="w-full"
      controls
      autoPlay
      muted
      ref={video}
      onTouchStart={startScrub}
      onTouchMove={scrub}
      onTouchEnd={compose(resetTouchPosition, scrub)}
    >
      {sources(src)}
    </video>
  );
});

export default Video;
