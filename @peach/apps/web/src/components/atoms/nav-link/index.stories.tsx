import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from ".";

export default {
  title: "Atoms/Nav Link",
  component: NavLink,
} as Meta;

export const Primary: StoryObj<typeof NavLink> = {
  args: {
    href: "",
    active: false,
    color: "purple",
    children: "Home",
  },
};
