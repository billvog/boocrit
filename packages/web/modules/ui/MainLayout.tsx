import React from "react";
import { MyCenterSpinner } from "./MyCenterSpinner";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface MainLayoutProps {
  showLoading: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showLoading = false,
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <Topbar />
        <div className="flex-1 font-roboto">
          {showLoading ? <MyCenterSpinner /> : children}
        </div>
      </div>
    </div>
  );
};
