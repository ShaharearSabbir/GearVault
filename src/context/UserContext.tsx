// context/UserContext.tsx
import { createContext, useContext } from "react";
import { User } from "@/generated/prisma/browser";

interface UserContextType {
  user: Omit<User, "password"> | null;
  isPending: boolean;
  isAuthenticated: boolean;
  login: (userData: Omit<User, "password">) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within an AuthProvider");
  return context;
};
