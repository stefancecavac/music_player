import React from "react";
import { MenuButton } from "./components/menuComponents/MenuButton";
import { ThemeChangerComponent } from "./components/ThemeChangerComponent";
import { UseAuthContext } from "./context/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = UseAuthContext();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primary to-secondary  p-2">
      <div className="bg-base-100/50 rounded-lg p-1   flex items-center gap-2 w-fit">
        {user && <MenuButton />}
        <ThemeChangerComponent />
        {user && <p>{user?.email}</p>}
        {user && (
          <button onClick={() => logout()} className="btn btn-square btn-sm text-base-content/70">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
        )}
      </div>
      <div className=" flex h-full items-center justify-center ">{children}</div>
    </div>
  );
};
