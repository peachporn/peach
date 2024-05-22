import sharedConfig, { commonContent } from "@peach/config-tailwind";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/app/**/*.tsx",
    "../../libraries/ui/src/**/*.tsx",
    ...commonContent,
  ],
  presets: [sharedConfig],
};

export default config;
