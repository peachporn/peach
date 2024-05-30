import type { Meta, StoryObj } from "@storybook/react";
import { Tag, colors, variants } from ".";

const stories = Object.entries(colors).flatMap(([color]) =>
  Object.entries(variants).map(([variant]) => ({
    color,
    variant,
  }))
) as { color: keyof typeof colors; variant: keyof typeof variants }[];

export default {
  title: "Atoms/Tag",
  component: () => (
    <div className="grid grid-cols-[80px_80px] justify-items-start gap-4">
      {stories.map(({ color, variant }) => (
        <Tag
          href="#"
          key={`${color}-${variant}`}
          color={color}
          variant={variant}
        >
          BDSM
        </Tag>
      ))}
    </div>
  ),
} as Meta;

export const Default: StoryObj = {
  args: {
    children: "BDSM",
    href: "/genres/1",
    variant: "purple",
  },
};
