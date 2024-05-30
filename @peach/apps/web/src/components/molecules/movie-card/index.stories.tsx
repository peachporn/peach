import type { Meta, StoryObj } from "@storybook/react";
import { MovieCard, type MovieCardProps } from ".";

export default {
  title: "Molecules/Movie Card",
  component: MovieCard,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryObj<MovieCardProps> = {
  args: {
    title: "This is a very long title and there are many wor",
    duration: "38:14",
    screencap: "https://via.placeholder.com/270",
    actresses: [
      { label: "Jynx Maze", href: "/" },
      { label: "Riley Reid", href: "/" },
      { label: "Mia Malkova", href: "/" },
    ],
    website: { label: "Hookup Hotshot", href: "/" },
    tags: [
      {
        label: "Glamcore",
        href: "/",
      },
      {
        label: "BBG",
        href: "/",
      },
    ],
    negativeIndex: 0,
  },
};
