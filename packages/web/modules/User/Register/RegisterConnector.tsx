import { RegisterController } from "@boocrit/controller";
import { useRouter } from "next/router";
import React from "react";
import { MyCenterSpinner } from "../../ui/MyCenterSpinner";
import { RegisterView } from "./RegisterView";

interface RegisterConnectorProps {}
export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
  const router = useRouter();

  const finished = () => {
    router.push("/");
  };

  return (
    <RegisterController onFinish={finished}>
      {(props) =>
        props.isLoading ? <MyCenterSpinner /> : <RegisterView {...props} />
      }
    </RegisterController>
  );
};
