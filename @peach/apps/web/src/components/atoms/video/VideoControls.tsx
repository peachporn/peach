import { VideoControlsVolume } from "@/components/atoms/video/VideoControlsVolume";
import { useVideoStore } from "@/components/atoms/video/VideoProvider";
import { IconPause } from "../icons/pause";
import { IconPlay } from "../icons/play";

export const VideoControls = () => {
  const setIsPlaying = useVideoStore((state) => state.setIsPlaying);
  const isPlaying = useVideoStore((state) => state.isPlaying);

  return (
    <div className='flex items-center gap-3 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent px-3 pb-3 pt-4'>
      {!isPlaying ? (
        <button type='button' className='text-neutral-white' onClick={() => setIsPlaying(true)}>
          <IconPlay />
        </button>
      ) : (
        <button type='button' className='text-neutral-white' onClick={() => setIsPlaying(false)}>
          <IconPause />
        </button>
      )}
      <VideoControlsVolume />
    </div>
  );
};
