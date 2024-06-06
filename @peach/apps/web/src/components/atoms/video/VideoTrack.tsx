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
          "h-screen max-h-2 w-full cursor-pointer rounded-full bg-[var(--video-track-background)] transition-[max-height] hover:max-h-6",
          { "max-h-6": isSeeking }
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
