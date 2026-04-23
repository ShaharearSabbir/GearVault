"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import defaultUserImage from "@/assets/user.png";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { logout } from "@/actions/auth.action";
import { homeNavLinks } from "@/config/navConfig";
import ActiveLink from "./ActiveLink";

export default function NavActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout: logoutClient } = useUser();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      logoutClient();
      setIsProfileOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-3">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden">
                {user?.image ? (
                  <Image
                    width={32}
                    height={32}
                    src={user.image || defaultUserImage}
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <UserIcon size={18} />
                )}
              </div>
              <ChevronDown
                size={14}
                className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-[60]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-50 p-6 flex flex-col gap-8 md:hidden">
          {/* REUSING YOUR NAV ITEMS HERE */}
          <nav className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Menu
            </p>
            {homeNavLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl"
              >
                <ActiveLink link={link} />
              </div>
            ))}
          </nav>

          <hr className="border-slate-100" />

          {/* AUTH SECTION */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Account
            </p>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-slate-900 font-bold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={20} /> My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 font-medium text-lg"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/login"
                  className="py-3 text-center border border-slate-200 rounded-xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="py-3 text-center bg-slate-900 text-white rounded-xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
