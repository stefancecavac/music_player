import React from "react";
import { MenuButton } from "./components/MenuButton";
import { ThemeChangerComponent } from "./components/ThemeChangerComponent";
import { UseAuthContext } from "./context/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = UseAuthContext();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primary to-secondary  p-2">
      <div className="bg-base-100/50 rounded-lg p-1  border border-base-200 flex items-center gap-2 w-fit">
        {user && <MenuButton />}
        <ThemeChangerComponent />
        <p>{user?.email}</p>
      </div>
      <div className=" flex h-full items-center justify-center ">{children}</div>
    </div>
  );
};
