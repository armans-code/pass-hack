import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [accessToken, setAccessToken] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser?.getIdTokenResult().then((res) => {
          setAccessToken(res.token);
          setRole(res.claims.role);
          setIsAuthenticated(true);
        });
      }
    );
    return unsubscribeAuthStateChanged;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
