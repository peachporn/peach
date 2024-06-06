import { useVideo, useVideoStore } from "@/components/atoms/video/VideoProvider";
import { VideoTrack } from "@/components/atoms/video/VideoTrack";
import { cn } from "@/lib/cn";
import { Slider, SliderTrack } from "react-aria-components";

type VideoControlsProgressProps = {
  className?: string;
  trackClassName?: string;
};
export const VideoControlsProgress = ({
  className,
  trackClassName,
}: VideoControlsProgressProps) => {
  const { videoRef } = useVideo();

  const progress = useVideoStore((state) => state.progress);
  const setProgress = useVideoStore((state) => state.setProgress);
  const setIsSeeking = useVideoStore((state) => state.setIsSeeking);

  return (
    <Slider
      aria-label='Progress'
      className={cn(
        "w-full [--video-track-background:theme(colors.peach.800)] [--video-track-foreground:theme(colors.peach.400)]",
        className
      )}
      step={1}
      minValue={0}
      maxValue={100}
      value={100 * progress}
      onChange={(value) => {
        setIsSeeking(true);
        setProgress(value / 100);
        videoRef.current?.seekTo(value / 100);
      }}
      onChangeEnd={() => {
        setIsSeeking(false);
      }}
    >
      <SliderTrack className={trackClassName}>
        {({ state: { getThumbPercent } }) => <VideoTrack width={getThumbPercent(0) * 100 + "%"} />}
      </SliderTrack>
    </Slider>
  );
};
