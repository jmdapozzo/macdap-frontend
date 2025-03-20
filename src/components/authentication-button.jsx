import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const AuthenticationButton = () => {
  const { keycloak } = useKeycloak();

  return keycloak.authenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
