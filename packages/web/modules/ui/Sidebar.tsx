import { useRouter } from "next/router";
import React from "react";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="bg-accent flex flex-col space-y-6" style={{ width: 290 }}>
      <div className="px-6 pt-5 flex items-center space-x-6 select-none">
        <img src="/favicon.ico" style={{ width: 52 }} />
        <div className="font-slab font-bold text-3xl text-secondary">
          Boocrit
        </div>
      </div>
      <div
        className="mx-6 bg-black bg-opacity-5 rounded-xl"
        style={{ height: 3 }}
      />
      <div className="flex flex-col space-y-1.5">
        <SidebarItem text="Home" route="/app" />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  text: string;
  route: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, route }) => {
  const router = useRouter();
  return (
    <div
      className="bg-accent-semidark hover:bg-accent-lightdark text-accent-darkest px-6 py-3 font-slab font-bold text-lg transition-colors cursor-pointer"
      onClick={() => router.push(route)}
    >
      {text}
    </div>
  );
};
