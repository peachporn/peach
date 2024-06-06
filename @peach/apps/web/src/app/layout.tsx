import { copy, display } from "@/components/atoms/typography";
import { Navigation } from "@/components/molecules/navigation";
import { cn } from "@/lib/cn";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import "../styles/globals.scss";
import "../styles/tailwind.scss";
import "../styles/typography.scss";

export const metadata: Metadata = {
  title: "Peach",
  description: "Peach | Your porn collection",
};

const Providers = ({ children }: PropsWithChildren) => <NextUIProvider>{children}</NextUIProvider>;

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang='en'>
    <body className={cn(copy.variable, display.variable, "pb-32")}>
      <Providers>
        <Navigation
          items={[
            {
              label: "Movies",
              href: "/movies",
              color: "peach",
            },
            {
              label: "Actresses",
              href: "/actresses",
              color: "yellow",
            },
            {
              label: "Genres",
              href: "/genres",
              color: "purple",
            },
            {
              label: "Websites",
              href: "/websites",
              color: "blue",
            },
          ]}
        />
        {children}
      </Providers>
    </body>
  </html>
);
export default RootLayout;
