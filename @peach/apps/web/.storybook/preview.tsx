import { NextUIProvider } from "@nextui-org/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import React from "react";
import { copy, display } from "../src/components/atoms/typography";
import { cn } from "../src/lib/cn";
import "../src/styles/tailwind.scss";
import "../src/styles/typography.scss";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={cn(copy.variable, display.variable)}>
        <NextUIProvider>
          <Story />
        </NextUIProvider>
      </div>
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
