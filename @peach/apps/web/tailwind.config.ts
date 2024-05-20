import sharedConfig from "../../libraries/config-tailwind/tailwind.config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/app/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
