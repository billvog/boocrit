import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { MyCenterSpinner } from "../ui/MyCenterSpinner";

interface WaitAuthProps {
  RequireLoggedIn?: boolean;
  RequireNotLoggedIn?: boolean;
}

export const WaitAuth: React.FC<WaitAuthProps> = ({
  RequireLoggedIn = false,
  RequireNotLoggedIn = false,
  children,
}) => {
  const router = useRouter();

  const [ok, setOk] = useState(
    RequireLoggedIn || RequireNotLoggedIn ? false : true
  );

  const { me } = useContext(AuthContext);

  useEffect(() => {
    if (ok) {
      return;
    }

    if (RequireLoggedIn) {
      if (!me) {
        router.replace("/welcome");
      } else if (me) {
        setOk(true);
      }
    }

    if (RequireNotLoggedIn) {
      if (me) {
        router.replace("/");
      } else if (!me) {
        setOk(true);
      }
    }
  }, [me, router]);

  return (
    <div className="w-full h-screen">{ok ? children : <MyCenterSpinner />}</div>
  );
};
