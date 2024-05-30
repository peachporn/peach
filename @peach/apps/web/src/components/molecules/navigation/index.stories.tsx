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
      },
      {
        label: "Actresses",
        href: "/actresses",
      },
      {
        label: "Genres",
        href: "/genres",
      },
      {
        label: "Websites",
        href: "/websites",
      },
    ],
  },
};
