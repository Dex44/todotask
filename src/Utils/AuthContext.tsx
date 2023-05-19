import React, { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  userData: Object | {};
  setUserData: (userData: Object | {}) => void;
};
interface MyComponentProps {
  children: React.ReactNode;
}
const initialAuthContext: AuthContextType = {
  token: null,
  setToken: () => {},
  userData: {},
  setUserData: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<Object | {}>({});

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
