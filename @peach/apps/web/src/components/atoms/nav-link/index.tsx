import { cn } from "@/lib/cn";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export const colors = {
  peach: "before:bg-peach-500",
  green: "before:bg-green-500",
  yellow: "before:bg-yellow-500",
  purple: "before:bg-purple-500",
  blue: "before:bg-blue-700",
};

export type NavLinkProps = PropsWithChildren<
  {
    active: boolean;
    color: keyof typeof colors;
  } & LinkProps
>;

export const NavLink = ({ children, color, active, ...props }: NavLinkProps) => (
  <Link
    className={cn(
      `relative before:absolute before:bottom-[-.1em] before:h-1.5 before:w-[calc(100%+theme(space.2))] before:origin-right before:-translate-x-1 before:scale-x-0 before:transform-gpu before:rounded-sm before:transition-transform before:content-[''] hover:before:origin-left hover:before:scale-x-100`,
      colors[color],
      {
        "before:origin-left before:scale-x-100": active,
      }
    )}
    {...props}
  >
    {children}
  </Link>
);
