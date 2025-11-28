"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const cities: { title: string; href: string; description: string }[] = [
  {
    title: "Mumbai",
    href: "/cities/payday-loan-in-mumbai",
    description: "Avail loans in Mumbai",
  },
  {
    title: "Delhi",
    href: "/cities/payday-loan-in-delhi",
    description: "Avail loans in Delhi",
  },
  {
    title: "Bengaluru",
    href: "/cities/payday-loan-in-bengaluru",
    description: "Avail loans in Bengaluru",
  },
  {
    title: "Hyderabad",
    href: "/cities/payday-loan-in-hyderabad",
    description: "Avail loans in Hyderabad",
  },
  {
    title: "Pune",
    href: "/cities/payday-loan-in-pune",
    description: "Avail loans in Pune",
  },
  {
    title: "Kolkata",
    href: "/cities/payday-loan-in-kolkata",
    description: "Avail loans in Kolkata",
  },
  {
    title: "Chennai",
    href: "/cities/payday-loan-in-chennai",
    description: "Avail loans in Chennai",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block p-2 rounded-md hover:bg-gray-100">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-xs text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full mx-auto py-4 px-6 md:px-12 lg:px-24 fixed top-0 left-0 right-0 z-50 bg-red-50 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <NavigationMenuLink asChild>
                    <Link href="/personal-loan">Personal loan</Link>
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-3">
                    <ListItem
                      href="/personal-loan/insta-loan"
                      title="Insta Loan"
                    >
                      Get an instant personal loan with quick approval.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Loan calculators</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4 p-3">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/loan-calculators/personal-emi-calculator">
                          Personal EMI Calculator
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/loan-calculators/eligibility-loan-calculator">
                          Eligibility Loan Calculator
                        </Link>
                      </NavigationMenuLink>
                      {/* <NavigationMenuLink asChild>
                        <Link href="/loan-calculators/cibil-score-checker">
                          Cibil Score Checker
                        </Link>
                      </NavigationMenuLink> */}
                      <NavigationMenuLink asChild>
                        <Link href="/loan-calculators/loan-comparison-calculator">
                          Loan Comparison Calculator
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-3 md:grid-cols-2 lg:grid-cols-3 w-[500px]">
                    {cities.map((c) => (
                      <ListItem key={c.title} title={c.title} href={c.href}>
                        {c.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-3">
                    <li>
                      <Link href="/blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link href="/about-us">About us</Link>
                    </li>
                    <li>
                      <Link href="/news">News</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-3">
                    <li>
                      <Link href="/contact-us">Contact us</Link>
                    </li>
                    <li>
                      <Link href="/enquire-now">Enquire now</Link>
                    </li>
                    <li>
                      <Link href="/track-loan">Track loan</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/signup">
                    <Button size="default" variant="default" className="text-base">
                      Apply now
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/lin-logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4 px-4">
                <Link href="/apply-loan">Personal Loan</Link>
                <Link href="#">Loan Calculators</Link>
                <Link href="/loan/mumbai">Cities</Link>
                <Link href="/blogs">Learn</Link>
                <Link href="/contact">Support</Link>
                <Link href="/login">Login</Link>
                <Button variant="default" className="w-full">Apply now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
