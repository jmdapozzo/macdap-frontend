import React from "react";
import { dummyAuth0 } from "../auth/dummy-auth0";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const AuthenticationButton = () => {
  const { isAuthenticated } = dummyAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
