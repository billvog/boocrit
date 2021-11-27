import { AddBookController } from "@boocrit/controller";
import React from "react";
import { AddBookView } from "./AddBookView";

interface AddBookConnectorProps {}
export const AddBookConnector: React.FC<AddBookConnectorProps> = ({}) => {
  return (
    <AddBookController>
      {(props) => <AddBookView {...props} />}
    </AddBookController>
  );
};
