"use client";
import { IconSettings } from "@/components/atoms/icons/settings";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

type NavigationProps = {
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
};

export const Navigation = ({ items }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll={true}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-3">
          <Image
            src={"/logo.png"}
            width={40}
            height={40}
            alt={"Peach"}
            className="rounded-full"
          />
          <p className="display text-2xl">Peach</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {items.map((item) => (
          <NavbarItem key={item.label} isActive={item.active}>
            <Link className="text-neutral-black" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Link className="text-neutral-black" href="/settings" size="lg">
          <IconSettings />
        </Link>
      </NavbarContent>
      <NavbarMenu>
        {items.map((item) => (
          <NavbarMenuItem key={item.label} isActive={item.active}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
