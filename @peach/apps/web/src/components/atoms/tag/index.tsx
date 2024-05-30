import NextLink, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { cn } from "../../../lib/cn";

export const colors = {
  white: "hover:bg-neutral-truewhite hover:text-neutral-black",
  green: "hover:bg-green-500",
  yellow: "hover:bg-yellow-500",
  purple: "hover:bg-purple-500",
  blue: "hover:bg-blue-700",
};

export const variants = {
  bold: "bg-peach-500 text-neutral-white",
  light: "bg-neutral-white text-neutral-black",
};

export const Tag = ({
  children,
  className,
  color,
  variant,
  ...props
}: LinkProps &
  PropsWithChildren<{
    className?: string;
    color: keyof typeof colors;
    variant: keyof typeof variants;
  }>) => (
  <NextLink
    className={cn(
      "text-xs rounded-full px-1.5 py-0.5",
      variants[variant],
      colors[color],
      className
    )}
    {...props}
  >
    {children}
  </NextLink>
);
