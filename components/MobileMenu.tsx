"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/panel", label: "Panel" },
];

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Mobil menüyü aç"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 active:scale-95"
      >
        <Menu size={22} />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[84%] border-r border-white/10 bg-[#0f0f10] p-0 text-white"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Mobil Navigasyon Menusu</SheetTitle>
          <SheetDescription>Sayfalar arası geçiş menüsü</SheetDescription>
        </SheetHeader>
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs uppercase tracking-[0.25em] text-orange-400/90">
            Maki Restaurant
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">Navigasyon</h2>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-xl border border-transparent bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-white/15 hover:bg-white/10"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
