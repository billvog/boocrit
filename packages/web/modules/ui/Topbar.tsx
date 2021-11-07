import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = ({}) => {
  const { me } = useContext(AuthContext);
  if (!me) return null;

  return (
    <div className="w-full bg-primary-50 flex items-center justify-between p-3">
      <div />
      <div className="cursor-pointer">
        <img
          src={me.profileImage}
          className="rounded-full w-10 h-10 select-none"
        />
      </div>
    </div>
  );
};
