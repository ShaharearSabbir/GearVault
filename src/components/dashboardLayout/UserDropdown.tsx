"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { LogOut, User as UserIcon, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/auth.action";
import Image from "next/image";
import userDefaultImage from "@/assets/user.png";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout: logoutClient } = useUser();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      logoutClient();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold overflow-hidden">
          <Image
            width={32}
            height={32}
            src={user?.image || userDefaultImage}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-slate-900 leading-none">
            {user?.name}
          </p>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
            {user?.role}
          </p>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-150">
            <div className="px-4 py-2 border-b border-slate-50 mb-2">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.email}
              </p>
            </div>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Settings size={16} /> Account Settings
            </Link>

            {user?.role === "ADMIN" && (
              <Link
                href="/admin-dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Shield size={16} /> Admin Panel
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-slate-50 pt-2"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
