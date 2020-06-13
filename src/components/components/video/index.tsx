import { h, FunctionalComponent } from 'preact';
import { compose } from 'ramda';
import { useRef, useState } from 'preact/hooks';

type VideoSrc = {
  [type: string]: string;
};

export type VideoProps = {
  src: VideoSrc;
};

const sources = (src: VideoSrc) =>
  Object.keys(src).map(sourceType => <source type={sourceType} src={src[sourceType]} />);

export const Video: FunctionalComponent<VideoProps> = ({ src }) => {
  const [touchPosition, setTouchPosition] = useState(0);
  const video = useRef<HTMLVideoElement>();

  const startScrub = (e: TouchEvent) => setTouchPosition(e.touches[0].clientX);
  const resetTouchPosition = () => setTouchPosition(0);

  const scrub = (e: TouchEvent) => {
    if (!video.current) {
      return;
    }

    const current = video.current.currentTime;
    const newTouchPosition = e.changedTouches[0].clientX;
    const scrubTime = newTouchPosition - touchPosition;

    setTouchPosition(newTouchPosition);
    video.current.currentTime = current + scrubTime;
  };

  return (
    <video
      className="video"
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
};

export default Video;
