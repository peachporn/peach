import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

export const commonContent = [
  "../../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
