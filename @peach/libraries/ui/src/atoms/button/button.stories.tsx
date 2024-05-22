import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps } from ".";
import { Button } from ".";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {},
};
