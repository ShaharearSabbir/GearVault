import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import ActiveLink from "./ActiveLink";

import { homeNavLinks } from "@/config/navConfig";
import NavActions from "./NavActions";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo - Server Side */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="GearVault" width={32} height={32} />
          <h1 className="text-2xl font-bold tracking-tight">
            Gear<span className="font-light text-slate-400">Vault</span>
          </h1>
        </Link>

        {/* Desktop Nav - Server Side */}
        <nav className="hidden md:flex items-center gap-6">
          {homeNavLinks.map((link) => (
            <ActiveLink key={link.id} link={link} />
          ))}
        </nav>

        {/* Interactive Actions - Client Side */}
        <NavActions />
      </div>
    </header>
  );
};

export default Navbar;
