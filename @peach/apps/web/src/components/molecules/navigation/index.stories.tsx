import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from ".";

export default {
  title: "Molecules/Navigation",
  component: Navigation,
  decorators: [
    (Story) => (
      <div className="h-[150vh]">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryObj<typeof Navigation> = {
  args: {
    items: [
      {
        label: "Movies",
        href: "/movies",
        color: "peach",
      },
      {
        label: "Actresses",
        href: "/actresses",
        color: "yellow",
      },
      {
        label: "Genres",
        href: "/genres",
        color: "purple",
      },
      {
        label: "Websites",
        href: "/websites",
        color: "blue",
      },
    ],
  },
};
