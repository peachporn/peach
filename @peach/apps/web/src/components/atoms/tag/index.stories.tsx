import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from ".";

export default {
  title: "Atoms/Tag",
  component: Tag,
  decorators: [
    (Story) => (
      <div className="text-md">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryObj = {
  args: {
    children: "BDSM",
    href: "/genres/1",
    variant: "purple",
  },
};
