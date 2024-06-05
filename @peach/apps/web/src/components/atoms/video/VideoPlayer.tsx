import { useVideo, useVideoStore } from "@/components/atoms/video/VideoProvider";
import ReactPlayer from "react-player/lazy";

type VideoPlayerProps = { url: string; controls?: boolean };
export const VideoPlayer = ({ url, controls }: VideoPlayerProps) => {
  const { videoRef } = useVideo();

  const loop = useVideoStore((state) => state.loop);
  const muted = useVideoStore((state) => state.muted);
  const volume = useVideoStore((state) => state.volume);
  const isSeeking = useVideoStore((state) => state.isSeeking);
  const isPlaying = useVideoStore((state) => state.isPlaying);
  const setIsPlaying = useVideoStore((state) => state.setIsPlaying);
  const setHasPlayed = useVideoStore((state) => state.setHasPlayed);
  const setIsBuffering = useVideoStore((state) => state.setIsBuffering);
  const setDuration = useVideoStore((state) => state.setDuration);
  const setProgress = useVideoStore((state) => state.setProgress);

  return (
    <ReactPlayer
      ref={videoRef}
      url={url}
      controls={controls}
      playing={isPlaying}
      loop={loop}
      muted={muted}
      progressInterval={500}
      volume={volume}
      onPlay={() => {
        setIsPlaying(true);
        setHasPlayed(true);
      }}
      onPause={() => setIsPlaying(false)}
      onProgress={({ played }) => {
        if (isSeeking) return;
        setProgress(played);
      }}
      onBuffer={() => setIsBuffering(true)}
      onBufferEnd={() => setIsBuffering(false)}
      onDuration={setDuration}
      onError={console.error}
      config={{ file: { attributes: { autoPlay: loop, preload: "none" } } }}
      width="100%"
      height="100%"
      playsinline
    />
  );
};
