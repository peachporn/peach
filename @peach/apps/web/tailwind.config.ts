import { nextui } from "@nextui-org/react";
import chroma from "chroma-js";
import { zip } from "ramda";
import type { Config } from "tailwindcss";

const baseColors = {
  neutral: ["#122", "#faf3f3"],
  peach: ["#730011", "#FF1654", "#FFD6E0"],
  green: ["#0E5D0E", "#45BF55", "#C5EECA"],
  blue: ["#003869", "#3272F1", "#BED4FE"],
  yellow: ["#A38218", "#FAD455", "#FFEEB0"],
  purple: ["#3B217E", "#7D52EC", "#B1AFFB"],
};

type Color = keyof typeof baseColors;

const scaleToTailwind = (colors: string[]) => {
  const cls = chroma.scale(colors).mode("oklab").colors(10);

  return Object.fromEntries(
    zip(
      Array.from({ length: 10 }, (_, i) => (i === 0 ? 50 : i * 100)),
      cls
    )
  );
};

export const colors = Object.fromEntries(
  Object.entries(baseColors).map(([name, colors]) => [
    name,
    scaleToTailwind(colors),
  ])
) as { [key in Color]: Record<number, string> };

const config: Config = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "../../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "0.64rem",
      sm: "0.8rem",
      base: "1rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.56rem",
      "2xl": "1.95rem",
      "3xl": "2.44rem",
      "4xl": "3.05rem",
      "5xl": "3.81rem",
      "6xl": "4.77rem",
      "7xl": "5.96rem",
    },
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeSlide: "fade .2s ease forwards",
      },
    },
    colors: {
      ...colors,
      neutral: {
        ...colors.neutral,
        white: colors.neutral[900],
        black: colors.neutral[50],
        truewhite: "#fff",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: colors.neutral[50],
            background: colors.neutral[900],
            primary: { ...colors.peach, DEFAULT: colors.peach[300] },
            secondary: { ...colors.blue, DEFAULT: colors.blue[400] },
            success: { ...colors.green, DEFAULT: colors.green[300] },
            warning: { ...colors.yellow, DEFAULT: colors.yellow[300] },
            danger: { ...colors.purple, DEFAULT: colors.purple[500] },
          },
        },
        dark: {
          colors: {
            foreground: colors.neutral[900],
            background: colors.neutral[800],
            primary: { ...colors.peach, DEFAULT: colors.peach[300] },
            secondary: { ...colors.blue, DEFAULT: colors.blue[400] },
            success: { ...colors.green, DEFAULT: colors.green[400] },
            warning: { ...colors.yellow, DEFAULT: colors.yellow[400] },
            danger: { ...colors.purple, DEFAULT: colors.purple[500] },
          },
        },
      },
    }),
  ],
};

export default config;
