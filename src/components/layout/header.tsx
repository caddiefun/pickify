"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Shield,
  Server,
  Mail,
  Key,
  Briefcase,
  Users,
  Globe,
  GraduationCap,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const verticals = [
  {
    title: "VPNs",
    href: "/vpn",
    description: "Protect your privacy online",
    icon: Shield,
  },
  {
    title: "Web Hosting",
    href: "/hosting",
    description: "Find the perfect host for your site",
    icon: Server,
  },
  {
    title: "Email Marketing",
    href: "/email-marketing",
    description: "Grow your audience with email",
    icon: Mail,
  },
  {
    title: "Password Managers",
    href: "/password-managers",
    description: "Secure your credentials",
    icon: Key,
  },
  {
    title: "Project Management",
    href: "/project-management",
    description: "Organize your team's work",
    icon: Briefcase,
  },
  {
    title: "CRM Software",
    href: "/crm",
    description: "Manage customer relationships",
    icon: Users,
  },
  {
    title: "Website Builders",
    href: "/website-builders",
    description: "Create your website easily",
    icon: Globe,
  },
  {
    title: "Online Learning",
    href: "/online-learning",
    description: "Learn new skills online",
    icon: GraduationCap,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Pickify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                    {verticals.map((vertical) => (
                      <li key={vertical.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={vertical.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <vertical.icon className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium leading-none">
                                {vertical.title}
                              </span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {vertical.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/methodology" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Methodology
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild>
            <Link href="/vpn">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground px-2">
                  Categories
                </h3>
                {verticals.map((vertical) => (
                  <Link
                    key={vertical.href}
                    href={vertical.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent"
                  >
                    <vertical.icon className="h-4 w-4 text-primary" />
                    {vertical.title}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                >
                  About
                </Link>
                <Link
                  href="/methodology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                >
                  Methodology
                </Link>
              </div>
              <div className="border-t pt-4">
                <Button asChild className="w-full">
                  <Link href="/vpn" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
