import { NextUIProvider } from "@nextui-org/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/tailwind.css";

const preview: Preview = {
	decorators: [
		(Story) => (
			<NextUIProvider>
				<Story />
			</NextUIProvider>
		),
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
