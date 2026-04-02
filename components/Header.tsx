import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="bg-[oklch(37%_0.013_285.805_/_0.6)] backdrop-blur-md">
      <div className="flex justify-between mx-auto max-w-7xl items-center  px-4">
        <div className=" md:hidden">
          <Menu size={31} className="text-white" />
        </div>

        <div className="relative w-20 h-10 md:w-25 md:h-10 rounded-lg overflow-hidden">
          <Image src="/maki-bg.jpeg" fill alt="bg image" />
        </div>

        <nav className="hidden md:flex gap-4 text-white font-bold text-l">
          <Link href="/" className="hover:text-orange-500">
            Ana sayfa
          </Link>
          <Link href="/menu" className="hover:text-orange-500">
            Menü
          </Link>
        </nav>

        <div className="flex items-center gap-2 py-4">
          <Link href="/">
            <AiFillTikTok
              size={32}
              className="text-white hover:text-orange-500 cursor-pointer"
            />
          </Link>
          <Link href="/">
            <RiInstagramLine
              size={32}
              className="text-white hover:text-orange-500 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
