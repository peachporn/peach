import { VideoControlsVolume } from "@/components/atoms/video/VideoControlsVolume";
import { useVideoStore } from "@/components/atoms/video/VideoProvider";
import { IconPause } from "../icons/pause";
import { IconPlay } from "../icons/play";

export const VideoControls = () => {
  const setIsPlaying = useVideoStore((state) => state.setIsPlaying);

  return (
    <div className='flex items-center gap-3 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent px-3 pb-3 pt-4'>
      <button
        type='button'
        className='hover:text-neutral-300 focus-visible:text-neutral-300 active:text-neutral-300'
        onClick={() => setIsPlaying(true)}
      >
        <IconPlay />
      </button>
      <button
        type='button'
        className='hover:text-neutral-300 focus-visible:text-neutral-300 active:text-neutral-300'
        onClick={() => setIsPlaying(false)}
      >
        <IconPause />
      </button>
      <VideoControlsVolume />
    </div>
  );
};
