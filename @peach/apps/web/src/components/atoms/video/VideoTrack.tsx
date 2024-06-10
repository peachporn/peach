import { cn } from "@/lib/cn";
import { CSSProperties } from "react";
import { useVideoStore } from "./VideoProvider";

type VideoTrackProps = {
  width: string;
};
export const VideoTrack = ({ width }: VideoTrackProps) => {
  const isSeeking = useVideoStore((state) => state.isSeeking);

  return (
    <div className='py-1'>
      <div
        className={cn(
          "h-screen max-h-2 w-full cursor-pointer rounded-full bg-[var(--video-track-background)] transition-[max-height] hover:max-h-2",
          { "max-h-2": isSeeking }
        )}
      >
        <div
          className='h-full w-[--width] rounded-full bg-[var(--video-track-foreground)] transition-[width] duration-100'
          style={{ "--width": width } as CSSProperties}
        />
      </div>
    </div>
  );
};

type VideoVolumeTrackProps = {
  height: number;
};

export const VideoVolumeTrack = ({ height }: VideoVolumeTrackProps) => (
  <div className={cn("h-16 w-full cursor-pointer rounded-full bg-[var(--video-track-background)]")}>
    <div
      className='h-full w-2 origin-bottom scale-y-[--height] transform rounded-full bg-[var(--video-track-foreground)] transition-[width] duration-100'
      style={{ "--height": height } as CSSProperties}
    />
  </div>
);
