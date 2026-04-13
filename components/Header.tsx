import Image from "next/image";
import Link from "next/link";
import { RiInstagramLine, RiWhatsappLine } from "react-icons/ri";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[oklch(37%_0.013_285.805_/_0.55)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <Link
          href="/"
          className="relative h-10 w-20 overflow-hidden rounded-lg md:h-10 md:w-24"
        >
          <Image src="/maki-bg.jpeg" fill alt="bg image" />
        </Link>

        <nav className="hidden gap-6 text-sm font-semibold text-white md:flex">
          <Link href="/" className="transition hover:text-orange-400">
            Ana sayfa
          </Link>
          <Link href="/menu" className="transition hover:text-orange-400">
            Menü
          </Link>
          <Link href="/panel" className="transition hover:text-orange-400">
            Panel
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://wa.me/905428459464"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <RiWhatsappLine
              size={30}
              className="cursor-pointer text-white transition hover:text-orange-400"
            />
          </Link>
          <Link
            href="https://www.instagram.com/maki_cesme?igsh=MWw3dXB4cXVmZnpqcg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <RiInstagramLine
              size={30}
              className="cursor-pointer text-white transition hover:text-orange-400"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
