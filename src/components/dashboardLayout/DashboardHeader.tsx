import Breadcrumbs from "./Breadcrumbs";
import UserDropdown from "./UserDropdown";
import { Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Navigation Context */}
      <div className="flex items-center gap-4">
        <Breadcrumbs />
      </div>

      {/* Right side: Utilities & Profile */}
      <div className="flex items-center gap-3">
        {/* Simple Notification Dot */}
        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <UserDropdown />
      </div>
    </header>
  );
}
