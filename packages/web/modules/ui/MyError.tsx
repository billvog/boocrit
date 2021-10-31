import React from "react";

interface MyErrorProps {}

export const MyError: React.FC<MyErrorProps> = ({ children }) => {
  return (
    <div className="font-slab font-bold text-red-400 text-lg text-left w-full">
      {children}
    </div>
  );
};
