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

export const NavLink = ({
  children,
  color,
  active,
  ...props
}: NavLinkProps) => (
  <Link
    className={cn(
      `before:content-[''] before:w-[calc(100%+theme(space.2))] before:opacity-50 before:-translate-x-1 before:absolute relative before:h-1.5 before:bottom-0 before:rounded-sm before:origin-right before:scale-x-0 before:transition-transform before:transform-gpu hover:before:scale-x-100 hover:before:origin-left`,
      colors[color],
      {
        "before:scale-x-100 before:origin-left": active,
      }
    )}
    {...props}
  >
    {children}
  </Link>
);
