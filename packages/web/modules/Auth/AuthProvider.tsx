import { useMeQuery, UserFragment } from "@boocrit/controller";
import React from "react";
import { MyCenterSpinner } from "../ui/MyCenterSpinner";
import { withMyApollo } from "../../utils/withMyApollo";

type User = UserFragment | null;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
const C: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <MyCenterSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        me: data?.Me || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = withMyApollo({ ssr: false })(C);
