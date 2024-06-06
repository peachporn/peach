"use client";
import { VideoControls } from "@/components/atoms/video/VideoControls";
import { useVideoStore, VideoProvider } from "@/components/atoms/video/VideoProvider";
import { VideoToggle } from "@/components/atoms/video/VideoToggle";
import { cn } from "@/lib/cn";
import { useTimer } from "@/lib/useTimer";
import { useTransitionEvents } from "@/lib/useTransition";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { IconPlay } from "../icons/play";
import styles from "./styles.module.scss";

const VideoPlayer = dynamic(() => import("./VideoPlayer").then((m) => m.VideoPlayer), {
  ssr: false,
});

export type VideoProps = { loop?: boolean };
const Video = ({ children, ...props }: PropsWithChildren<VideoProps>) => (
  <VideoProvider {...props}>{children}</VideoProvider>
);

type WrapperProps = { className?: string };
const Wrapper = ({ className, children }: PropsWithChildren<WrapperProps>) => {
  const setShowControls = useVideoStore((state) => state.setShowControls);

  const { startTimer, clearTimer } = useTimer(() => setShowControls(false), 2000);

  const handleStartTimer = () => {
    clearTimer();
    setShowControls(true);
    startTimer();
  };

  return (
    <div
      className={cn(
        styles.wrapper,
        "@container relative isolate flex flex-col justify-end",
        className
      )}
      onClick={handleStartTimer}
      onPointerMove={handleStartTimer}
    >
      {children}
    </div>
  );
};

type PlayerProps = { url: string; poster?: string; priority?: boolean };
const Player = ({ url, poster, priority }: PlayerProps) => {
  const showControls = useVideoStore((state) => state.showControls);
  const isPlaying = useVideoStore((state) => state.isPlaying);
  const toggleIsPlaying = useVideoStore((state) => state.toggleIsPlaying);
  const hasPlayed = useVideoStore((state) => state.hasPlayed);
  const setHasPlayed = useVideoStore((state) => state.setHasPlayed);

  const [showPoster, setShowPoster] = useState<boolean>(!hasPlayed);

  const ref = useTransitionEvents<HTMLImageElement>("opacity", {
    onEnd: () => setShowPoster(false),
  });

  return (
    <>
      <div className='-z-1 bg-skeleton absolute inset-0'>
        <VideoPlayer url={url} />
      </div>
      <>
        {poster && showPoster && (
          <Image
            alt={""}
            ref={ref}
            src={poster}
            priority={priority}
            sizes='300px'
            className={cn("-z-1 bg-skeleton absolute inset-0 object-cover transition-opacity", {
              ["opacity-0"]: hasPlayed,
            })}
            fill
          />
        )}
        {hasPlayed ? (
          <>
            <VideoToggle />
            <div
              className={cn("z-10 opacity-0 transition-opacity", {
                ["opacity-100"]: showControls || !isPlaying,
              })}
            >
              <VideoControls />
            </div>
          </>
        ) : (
          <button
            type='button'
            aria-label='Play'
            className='absolute inset-0 flex items-center justify-center bg-[radial-gradient(rgba(0,0,0,0.2)_0%,rgba(53,53,53,0.2)_100%)]'
            onClick={() => {
              toggleIsPlaying();
              setHasPlayed(true);
            }}
          >
            <div className='text-brightgreen-900 bg-neutral-white flex size-12 items-center justify-center rounded-xl'>
              <IconPlay />
            </div>
          </button>
        )}
      </>
    </>
  );
};

export { Video, Player as VideoPlayer, Wrapper as VideoWrapper };
