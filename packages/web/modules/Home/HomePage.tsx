import React from "react";
import { WaitAuth } from "../Auth/WaitAuth";
import { HeaderController } from "../HeaderController";
import { MainLayout } from "../ui/MainLayout";
import { HomeController } from "./HomeController";

interface HomePageProps {}
export const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <>
      <HeaderController title="Home – Boocrit, the online book community" />
      <WaitAuth RequireLoggedIn>
        <MainLayout>
          <HomeController />
        </MainLayout>
      </WaitAuth>
    </>
  );
};
