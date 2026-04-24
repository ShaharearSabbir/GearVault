"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Import only the specific icons you need
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  History,
  ShieldAlert,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { IconName } from "@/config/sidebarConfig";

// Create a static map. This is tree-shakeable!
const IconMap: Record<IconName, LucideIcon> = {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  History,
  ShieldAlert,
  Layers,
};

interface SidebarLinkProps {
  title: string;
  link: string;
  iconName: IconName;
}

export default function SidebarLink({
  title,
  link,
  iconName,
}: SidebarLinkProps) {
  const pathname = usePathname();

  // Grab the icon from our map
  const Icon = IconMap[iconName];

  const isActive =
    link === "/dashboard" || link === "/admin-dashboard"
      ? pathname === link
      : pathname.startsWith(link);

  return (
    <Link
      href={link}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }
      `}
    >
      {Icon && <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />}
      <span>{title}</span>
    </Link>
  );
}
