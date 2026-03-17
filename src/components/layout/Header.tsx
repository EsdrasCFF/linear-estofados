"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sofa, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

const links = [
  { href: "/", label: "Início" },
  { href: "/sofas", label: "Sofás" },
  { href: "/cabeceiras", label: "Cabeceiras" },
  { href: "/arte-em-tecido", label: "Arte em Tecido" },
  { href: "/processo", label: "Processo" },
  { href: "/guia-de-design", label: "Guia de Design" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between max-w-[1200px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-foreground"
        >
          <Sofa className="w-6 h-6 text-[#D97706]" />
          <span>LINEAR STORE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#D97706] relative py-1",
                pathname === link.href
                  ? "text-[#D97706] border-b-2 border-[#D97706]"
                  : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search & Desktop CTA */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="text-foreground/80">
            <Search className="w-5 h-5" />
          </Button>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/processo">
              <Button
                size="default"
                className="bg-[#D97706] hover:bg-[#B45309] text-white rounded-full px-6"
              >
                Fale com um especialista
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border relative">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <div className="flex flex-col h-full pt-16 px-6">
                <nav className="flex flex-col gap-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-xl font-medium transition-colors",
                        pathname === link.href
                          ? "text-[#D97706]"
                          : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pb-10">
                  <Link href="/processo" onClick={() => setOpen(false)}>
                    <Button
                      size="lg"
                      className="w-full bg-[#D97706] hover:bg-[#B45309] text-white rounded-full h-14 text-lg"
                    >
                      Fale com um especialista
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
