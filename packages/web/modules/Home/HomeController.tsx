import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

interface HomeControllerProps {}
export const HomeController: React.FC<HomeControllerProps> = ({}) => {
  const { me } = useContext(AuthContext);
  if (!me) return null;

  return (
    <div className="p-7">
      <div className="font-slab font-black text-3xl text-secondary text-center">
        Welcome back, {me.firstName}!
      </div>
    </div>
  );
};
