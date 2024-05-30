"use client";
import { IconSettings } from "@/components/atoms/icons/settings";
import { NavLink, NavLinkProps } from "@/components/atoms/nav-link";
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
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavigationProps = {
  items: {
    label: string;
    href: string;
    color: NavLinkProps["color"];
  }[];
};

export const Navigation = ({ items }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
          <NavbarItem key={item.label}>
            <NavLink
              active={pathname.startsWith(item.href)}
              color={item.color}
              href={item.href}
            >
              {item.label}
            </NavLink>
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
          <NavbarMenuItem
            key={item.label}
            isActive={pathname.startsWith(item.href)}
          >
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
