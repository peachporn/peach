import { Button as NextUIButton } from "@nextui-org/react";

export type ButtonProps = Record<string, unknown>;

export function Button() {
	return <NextUIButton className="bg-pink-400">Button</NextUIButton>;
}
