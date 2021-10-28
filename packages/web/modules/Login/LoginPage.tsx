import { NextPage } from "next";
import { HeaderController } from "../../modules/HeaderController";
import { LoginConnector } from "../../modules/Login/LoginConnector";
import { withMyApollo } from "../../utils/withMyApollo";
import { WaitAuth } from "../Auth/WaitAuth";

const C: NextPage = ({}) => {
  return (
    <>
      <HeaderController title="Sign in your Boocrit account" />
      <WaitAuth RequireNotLoggedIn>
        <LoginConnector />
      </WaitAuth>
    </>
  );
};

export const LoginPage = withMyApollo()(C);
