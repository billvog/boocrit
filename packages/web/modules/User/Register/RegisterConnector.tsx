import { RegisterController } from "@boocrit/controller";
import { useRouter } from "next/router";
import React from "react";
import { RegisterView } from "./RegisterView";

interface RegisterConnectorProps {}
export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
  const router = useRouter();

  const finished = () => {
    router.push("/app");
  };

  return (
    <RegisterController onFinish={finished}>
      {(props) => <RegisterView {...props} />}
    </RegisterController>
  );
};