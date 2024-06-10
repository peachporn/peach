"use client";

import { VideoProps } from "@/components/atoms/video/index";
import { createContext, MutableRefObject, PropsWithChildren, useContext, useRef } from "react";
import type { default as ReactPlayerType } from "react-player";
import { createStore, useStore } from "zustand";

type VideoState = {
  loop: boolean;
  autoPlay: boolean;
  showControls: boolean;
  setShowControls: (showControls: boolean) => void;
  hasPlayed: boolean;
  setHasPlayed: (hasPlayed: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleIsPlaying: () => void;
  isBuffering: boolean;
  setIsBuffering: (isBuffering: boolean) => void;
  isSeeking: boolean;
  setIsSeeking: (isSeeking: boolean) => void;
  muted: boolean;
  toggleMuted: () => void;
  duration: number;
  setDuration: (duration: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
};
const createVideoStore = ({ loop }: VideoProps) =>
  createStore<VideoState>()((set) => ({
    autoPlay: !!loop,
    loop: !!loop,
    showControls: true,
    setShowControls: (showControls) => set(() => ({ showControls })),
    hasPlayed: false,
    setHasPlayed: (hasPlayed) => set(() => ({ hasPlayed })),
    isPlaying: !!loop,
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    isBuffering: false,
    setIsBuffering: (isBuffering) => set(() => ({ isBuffering })),
    isSeeking: false,
    setIsSeeking: (isSeeking) => set(() => ({ isSeeking })),
    muted: !!loop,
    toggleMuted: () => {
      set((state) => ({ muted: !state.muted }));
    },
    duration: 0,
    setDuration: (duration) => set(() => ({ duration })),
    progress: 0,
    setProgress: (progress) => set(() => ({ progress })),
    volume: 1,
    setVolume: (volume) => {
      set(() => ({ volume, muted: volume === 0 }));
    },
  }));
type VideoStore = ReturnType<typeof createVideoStore>;

type VideoContextProps = {
  videoRef: MutableRefObject<ReactPlayerType | null>;
  store: VideoStore;
};
const VideoContext = createContext<VideoContextProps>(undefined as unknown as VideoContextProps);

export const VideoProvider = ({ children, ...props }: PropsWithChildren<VideoProps>) => {
  const videoRef = useRef<ReactPlayerType>(null);

  return (
    <VideoContext.Provider value={{ videoRef, store: useRef(createVideoStore(props)).current }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
export const useVideoStore = <T,>(selector: (state: VideoState) => T): T => {
  const { store } = useContext(VideoContext);
  return useStore(store, selector);
};
