import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer, VideoWrapper } from ".";
import { VideoControlsProgress } from "./VideoControlsProgress";
import { VideoProvider } from "./VideoProvider";

export default {
  title: "Atom/Video",
  component: () => (
    <VideoProvider>
      <div className='w-[800px]'>
        <VideoWrapper className='aspect-video overflow-hidden rounded-xl bg-neutral-700'>
          <VideoPlayer url='https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' />
        </VideoWrapper>
        <VideoControlsProgress />
      </div>
    </VideoProvider>
  ),
} as Meta;

export const Default: StoryObj = {};
