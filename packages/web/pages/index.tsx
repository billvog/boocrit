import type { NextPage } from "next";
import { LandingPage } from "../modules/Landing";
import { HeaderController } from "../modules/HeaderController";

const Landing: NextPage = () => {
  return (
    <>
      <HeaderController title="Welcome to Boocrit – The online book community" />
      <LandingPage />
    </>
  );
};

export default Landing;
