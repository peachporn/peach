import {
  Button as NextUIButton,
  cn,
  type ButtonProps as NextUIButtonProps,
} from "@nextui-org/react";

export type ButtonProps = NextUIButtonProps;

export const Button = ({ color, ...props }: ButtonProps) => (
  <NextUIButton
    {...props}
    color={color}
    className={cn({
      "from-peach-600 to-peach-500 bg-gradient-to-tr": color === "primary",
      "bg-gradient-to-tr from-purple-600 to-purple-400": color === "secondary",
      "bg-gradient-to-tr from-green-600 to-green-400": color === "success",
      "bg-gradient-to-tr from-yellow-600 to-yellow-400": color === "warning",
    })}
  >
    Button
  </NextUIButton>
);
