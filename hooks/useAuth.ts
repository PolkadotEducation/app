import { useContext } from "react";
import { AuthContext } from "@/context/auth/authProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth");
  }

  return context;
};
