import type { Meta, StoryObj } from "@storybook/react";
import { Link } from ".";

export default {
	title: "Atoms/Link",
	component: Link,
} as Meta;

export const Default: StoryObj = {
	args: {
		children: "Jynx Maze",
		href: "/actresses/jynx-maze",
	},
};
