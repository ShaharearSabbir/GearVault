"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500">
      <Link href="/" className="hover:text-slate-900 transition-colors">
        <Home size={16} />
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-slate-300" />
            <Link
              href={href}
              className={`capitalize transition-colors ${
                isLast
                  ? "text-slate-900 font-semibold cursor-default"
                  : "hover:text-slate-900"
              }`}
            >
              {path.replace(/-/g, " ")}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
