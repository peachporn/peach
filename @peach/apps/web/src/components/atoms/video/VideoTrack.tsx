import { CSSProperties } from "react";

type VideoTrackProps = {
  width: string;
};
export const VideoTrack = ({ width }: VideoTrackProps) => (
  <div className='py-1'>
    <div className='h-1.5 w-full rounded-full bg-[var(--video-track-background)] p-[1px]'>
      <div
        className='h-full w-[--width] rounded-full bg-[var(--video-track-foreground)]'
        style={{ "--width": width } as CSSProperties}
      />
    </div>
  </div>
);
