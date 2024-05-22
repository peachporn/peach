import { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from ".";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

export const Primary: StoryObj<ButtonProps> = {
  args: {},
};
