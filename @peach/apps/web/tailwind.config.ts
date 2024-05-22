import type { Config } from "tailwindcss";
import sharedConfig, {
  commonContent,
} from "../../libraries/config-tailwind/tailwind.config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/app/**/*.tsx",
    "../../libraries/ui/src/**/*.tsx",
    ...commonContent,
  ],
  presets: [sharedConfig],
};

export default config;
