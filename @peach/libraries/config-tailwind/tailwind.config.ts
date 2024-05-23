import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      colors: {
        pink: {
          100: "#32151e",
          200: "#68243b",
          300: "#9b2954",
          400: "#cd236a",
          DEFAULT: "#ff007f",
          500: "#ff007f",
          600: "#ff6aa1",
          700: "#ff99bd",
          800: "#ffbfd4",
          900: "#fee0ea",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

export const resolvedConfig = resolveConfig({ ...config, content: [] });

export const commonContent = [
  "../../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
