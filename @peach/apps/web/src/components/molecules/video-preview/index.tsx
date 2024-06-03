"use client";

import { videoForMovie } from "@/lib/assets";
import { useEffect, useRef } from "react";
import type { default as ReactPlayerType } from "react-player";
import ReactPlayer from "react-player";

type VideoPreviewProps = {
  movieId: number;
  onVideoLoaded?: () => void;
  className?: string;
};
export const VideoPreview = ({ movieId, onVideoLoaded, className }: VideoPreviewProps) => {
  const ref = useRef<ReactPlayerType | null>(null);

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let index = 0;
    const fractions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    const interval = setInterval(() => {
      if (!ref.current) return;
      index = (index + 1) % fractions.length;
      ref.current?.seekTo(fractions[index] / 100, "fraction");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={className}>
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        onReady={onVideoLoaded}
        style={{ width: "100%" }}
        ref={ref}
        url={videoForMovie({ id: movieId })}
        controls={false}
        loop={true}
        playing={true}
        muted={true}
      />
    </div>
  );
};
