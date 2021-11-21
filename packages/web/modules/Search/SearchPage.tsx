import React from "react";
import { WaitAuth } from "../Auth/WaitAuth";
import { HeaderController } from "../HeaderController";
import { MainLayout } from "../ui/MainLayout";
import { SearchController } from "./SearchController";

interface SearchPageProps {}
export const SearchPage: React.FC<SearchPageProps> = ({}) => {
  return (
    <>
      <HeaderController title="Search books – Boocrit" />
      <WaitAuth RequireLoggedIn>
        <MainLayout>
          <SearchController />
        </MainLayout>
      </WaitAuth>
    </>
  );
};
