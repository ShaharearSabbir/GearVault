"use client";

import { NavItem } from "@/types/NavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ link }: { link: NavItem }) => {
  const pathname = usePathname();

  // Handle Home specifically so it doesn't highlight every page
  const isActive =
    link.link === "/" ? pathname === "/" : pathname.startsWith(link.link);

  return (
    <Link
      href={link.link}
      className={`
        relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-md
        ${
          isActive
            ? "text-slate-900 bg-slate-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
        }
      `}
    >
      {link.title}

      {/* Subtle bottom indicator for active state */}
      {isActive && (
        <span className="absolute inset-x-3 -bottom-4 h-0.5 bg-slate-900 rounded-t-full hidden md:block" />
      )}
    </Link>
  );
};

export default ActiveLink;
