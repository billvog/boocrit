import { NextPage } from "next";
import { HeaderController } from "../../HeaderController";
import { withMyApollo } from "../../../utils/withMyApollo";
import { WaitAuth } from "../../Auth/WaitAuth";
import { RegisterConnector } from "./RegisterConnector";

const C: NextPage = ({}) => {
  return (
    <>
      <HeaderController title="Register a Boocrit account" />
      <WaitAuth RequireNotLoggedIn>
        <RegisterConnector />
      </WaitAuth>
    </>
  );
};

export const RegisterPage = withMyApollo()(C);
