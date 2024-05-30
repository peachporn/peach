import { Navigation } from "@/components/molecules/navigation";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import type { PropsWithChildren } from "react";
import "../styles/tailwind.css";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peach",
  description: "Peach | Your porn collection",
};

const Providers = ({ children }: PropsWithChildren) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = new URL(headers().get("x-url") ?? "")?.pathname;
  const isActive = (link: string) => {
    pathname.startsWith(link);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation
            items={[
              {
                label: "Movies",
                href: "/movies",
                active: isActive("/movies"),
              },
              {
                label: "Actresses",
                href: "/actresses",
                active: isActive("/actresses"),
              },
              {
                label: "Genres",
                href: "/genres",
                active: isActive("/genres"),
              },
              {
                label: "Websites",
                href: "/websites",
                active: isActive("/websites"),
              },
            ]}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
