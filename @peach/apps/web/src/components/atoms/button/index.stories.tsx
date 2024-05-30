import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps } from ".";
import { Button } from ".";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {
    color: "primary",
  },
};
export const Secondary: StoryObj<ButtonProps> = {
  args: {
    color: "secondary",
  },
};
export const Success: StoryObj<ButtonProps> = {
  args: {
    color: "success",
  },
};
export const Warning: StoryObj<ButtonProps> = {
  args: {
    color: "warning",
  },
};
