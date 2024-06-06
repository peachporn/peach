import { useVideoStore } from "@/components/atoms/video/VideoProvider";
import { VideoTrack } from "@/components/atoms/video/VideoTrack";
import { cn } from "@/lib/cn";
import { useTimer } from "@/lib/useTimer";
import { useState } from "react";
import { Slider, SliderTrack } from "react-aria-components";
import { IconMute } from "../icons/mute";
import { IconVolume } from "../icons/volume";

export const VideoControlsVolume = () => {
  const { startTimer, clearTimer } = useTimer(() => setExpanded(false));
  const [expanded, setExpanded] = useState<boolean>(false);

  const volume = useVideoStore((state) => state.volume);
  const setVolume = useVideoStore((state) => state.setVolume);
  const muted = useVideoStore((state) => state.muted);
  const toggleMuted = useVideoStore((state) => state.toggleMuted);

  return (
    <div
      className={cn(
        "can-hover:py-1 can-hover:pl-3 can-hover:pr-2 text-neutral-white flex items-center rounded-full transition-colors",
        {
          ["bg-[rgba(255,255,255,0.2)]"]: expanded,
        }
      )}
      onPointerLeave={startTimer}
    >
      <div
        className={cn("w-0 overflow-hidden transition-[width]", {
          ["w-16"]: expanded,
        })}
      >
        <div className='pr-2'>
          <Slider
            aria-label='Volume'
            className='w-full'
            step={1}
            minValue={0}
            maxValue={100}
            value={100 * volume}
            onChange={(value) => setVolume(value / 100)}
          >
            <SliderTrack>
              {({ state: { getThumbPercent } }) => (
                <VideoTrack width={getThumbPercent(0) * 100 + "%"} />
              )}
            </SliderTrack>
          </Slider>
        </div>
      </div>
      <button
        type='button'
        onClick={toggleMuted}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          clearTimer();
          setExpanded(true);
        }}
      >
        {muted ? <IconMute /> : <IconVolume />}
      </button>
    </div>
  );
};
