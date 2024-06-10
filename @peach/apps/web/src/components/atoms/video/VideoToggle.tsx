import { useVideoStore } from "@/components/atoms/video/VideoProvider";
import styles from "@/components/atoms/video/styles.module.scss";
import { cn } from "@/lib/cn";
import { Spinner } from "@nextui-org/react";
import { useRef, useState } from "react";
import { IconPause } from "../icons/pause";
import { IconPlay } from "../icons/play";

export const VideoToggle = () => {
  const isTouchRef = useRef<boolean>(false);
  const hasPausedRef = useRef<boolean>(false);
  const [toggleState, setToggleState] = useState<"play" | "pause">("play");

  const isBuffering = useVideoStore((state) => state.isBuffering);
  const toggleIsPlaying = useVideoStore((state) => state.toggleIsPlaying);

  const syncHasPausedRef = () => {
    if (hasPausedRef.current || toggleState !== "pause") return;
    hasPausedRef.current = true;
  };

  syncHasPausedRef();

  const handleToggleIsPlaying = () => {
    toggleIsPlaying();
    setToggleState((prevState) => (prevState === "play" ? "pause" : "play"));
  };

  const buttonClasses =
    "flex justify-center items-center size-9 @xs:size-12 text-brightgreen-900 bg-neutral-white rounded-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0";

  return (
    <button
      type='button'
      className='-z-1 absolute inset-0'
      tabIndex={-1}
      onPointerDown={(e) => {
        isTouchRef.current = e.pointerType !== "mouse";
      }}
      onClick={(e) => {
        if (e.button !== 0) return;
        handleToggleIsPlaying();
      }}
      aria-hidden
    >
      {isBuffering && <Spinner />}
      <div
        className={cn(buttonClasses, {
          [styles.togglePlay]: hasPausedRef.current && toggleState === "play",
        })}
      >
        <IconPlay className='@xs:w-6 w-5' />
      </div>
      <div
        className={cn(buttonClasses, {
          [styles.togglePlay]: hasPausedRef.current && toggleState === "pause",
        })}
      >
        <IconPause className='@xs:w-6 w-5' />
      </div>
    </button>
  );
};
