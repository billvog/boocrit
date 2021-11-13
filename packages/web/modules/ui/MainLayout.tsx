import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 mt-20 font-roboto">{children}</div>
      </div>
    </div>
  );
};
