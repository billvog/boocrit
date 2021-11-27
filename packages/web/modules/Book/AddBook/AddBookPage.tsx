import React from "react";
import { WaitAuth } from "../../Auth/WaitAuth";
import { HeaderController } from "../../HeaderController";
import { MainLayout } from "../../ui/MainLayout";
import { AddBookConnector } from "./AddBookConnector";

interface AddBookPageProps {}
export const AddBookPage: React.FC<AddBookPageProps> = ({}) => {
  return (
    <>
      <HeaderController title={`Add new book entry – Boocrit`} />
      <WaitAuth RequireLoggedIn>
        <MainLayout>
          <AddBookConnector />
        </MainLayout>
      </WaitAuth>
    </>
  );
};
