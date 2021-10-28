import React from "react";
import { MyButton } from "./MyButton";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="fixed left-0 top-0 flex justify-between items-center px-8 py-5 w-full bg-primary bg-opacity-60 backdrop-filter backdrop-blur z-10">
      <div className="flex items-center cursor-pointer">
        <div>
          <img src="/favicon.ico" className="w-12 mr-6 select-none" />
        </div>
        <div className="font-slab font-bold text-4xl text-secondary select-none">
          Boocrit
        </div>
      </div>
      <div>
        <MyButton color="accent" size="big">
          <div className="font-slab">Login</div>
        </MyButton>
      </div>
    </div>
  );
};
