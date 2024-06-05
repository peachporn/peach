"use client";
import { VideoPlayer, VideoWrapper } from "@/components/atoms/video";
import { VideoControlsProgress } from "@/components/atoms/video/VideoControlsProgress";
import { VideoProvider } from "@/components/atoms/video/VideoProvider";
import { screencapForMovie, videoForMovie } from "@/lib/assets";

type MoviePlayerProps = {
  id: number;
  cover: number;
};
export const MoviePlayer = ({ id, cover }: MoviePlayerProps) => (
  <VideoProvider>
    <VideoWrapper className='aspect-video overflow-hidden rounded-xl bg-neutral-700'>
      <VideoPlayer url={videoForMovie({ id })} poster={screencapForMovie({ id, cover })} />
    </VideoWrapper>
    <VideoControlsProgress className='[--video-track-foreground:theme(colors.peach.400)]' />
  </VideoProvider>
);
