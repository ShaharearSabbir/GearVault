import { Role } from "@/generated/prisma/enums";

export type IconName =
  | "LayoutDashboard"
  | "Package"
  | "Users"
  | "Settings"
  | "History"
  | "ShieldAlert" 
  | "Layers";

export interface SidebarNavItem {
  id: string;
  title: string;
  link: string;
  iconName: IconName;
}

export const sidebarLinks: Record<Role, SidebarNavItem[]> = {
  USER: [
    {
      id: "dashboard",
      title: "Overview",
      link: "/dashboard",
      iconName: "LayoutDashboard",
    },
    {
      id: "my-gear",
      title: "My Gear",
      link: "/dashboard/my-gear",
      iconName: "Package",
    },
    {
      id: "activity",
      title: "Activity Log",
      link: "/dashboard/activity",
      iconName: "History",
    },
    {
      id: "settings",
      title: "Settings",
      link: "/dashboard/settings",
      iconName: "Settings",
    },
  ],
  ADMIN: [
    {
      id: "admin-overview",
      title: "Admin Panel",
      link: "/admin-dashboard",
      iconName: "ShieldAlert",
    },
    {
      id: "category-management",
      title: "Category Management",
      link: "/admin-dashboard/categories",
      iconName: "Layers",
    },
    {
      id: "all-gear",
      title: "Global Inventory",
      link: "/admin-dashboard/inventory",
      iconName: "Package",
    },
    {
      id: "manage-users",
      title: "User Management",
      link: "/admin-dashboard/users",
      iconName: "Users",
    },
    {
      id: "system-settings",
      title: "System Config",
      link: "/admin-dashboard/settings",
      iconName: "Settings",
    },
  ],
};
