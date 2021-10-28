import type { NextPage } from "next";
import React from "react";
import { WaitAuth } from "../Auth/WaitAuth";
import { HeaderController } from "../HeaderController";
import { LandingView } from "./LandingView";

export const LandingPage: NextPage = () => {
  return (
    <>
      <HeaderController title="Welcome to Boocrit – The online book community" />
      <WaitAuth RequireNotLoggedIn>
        <LandingView />
      </WaitAuth>
    </>
  );
};
