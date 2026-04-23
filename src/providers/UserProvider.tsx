"use client";

import { getUser } from "@/actions/auth.action";
import { UserContext } from "@/context/UserContext";
import { User } from "@/generated/prisma/browser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUser().then((res) => {
      if (res.success) {
        setUser(res.user!);
        setIsAuthenticated(true);
      }
      setIsPending(false);
    });
  }, []);

  const login = (userData: Omit<User, "password">) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  };

  return (
    <UserContext.Provider
      value={{ user, isPending, isAuthenticated, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
