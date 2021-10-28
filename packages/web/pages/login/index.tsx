import { useHelloQuery } from "@boocrit/controller";
import { NextPage } from "next";
import { HeaderController } from "../../modules/HeaderController";
import { withMyApollo } from "../../utils/withMyApollo";
// import { LoginPage } from "../../modules/Login";

const Login: NextPage = ({}) => {
  const { data } = useHelloQuery();
  console.log(data);

  return (
    <>
      <HeaderController title="Sign in your Boocrit account" />
      {/* <LoginPage /> */}
    </>
  );
};

export default withMyApollo()(Login);
