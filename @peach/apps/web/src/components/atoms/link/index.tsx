import NextLink, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { cn } from "../../../lib/cn";

export type LinkType = {
	href: string;
	label: string;
};

export const Link = ({
	children,
	className,
	variant = "primary",
	...props
}: LinkProps &
	PropsWithChildren<{
		className?: string;
		variant?: "primary" | "secondary";
	}>) => (
	<NextLink
		className={cn(
			`${
				variant === "primary"
					? "hover:bg-secondary-400 hover:text-neutral-black focus-visible:bg-secondary-400"
					: "hover:bg-primary-400 focus-visible:bg-primary-400"
			} rounded-full p-1`,
			className,
		)}
		{...props}
	>
		{children}
	</NextLink>
);
