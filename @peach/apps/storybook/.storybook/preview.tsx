import { NextUIProvider } from "@nextui-org/react";
import type { Preview } from "@storybook/react";
import React from "react";
import "./font.css";
import "./tailwind.css";

const preview: Preview = {
	decorators: [
		(Story) => (
			<NextUIProvider>
				<Story />
			</NextUIProvider>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
