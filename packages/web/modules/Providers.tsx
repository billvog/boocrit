import React from "react";
import { AuthProvider } from "./Auth/AuthProvider";

export const Providers: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
