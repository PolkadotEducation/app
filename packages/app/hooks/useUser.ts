import { useContext } from "react";
import { UserContext } from "@/context/user/userProvider";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser");
  }

  return context;
};
