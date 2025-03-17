import React from "react";
import { dummyAuth0 } from "../auth/dummy-auth0";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { t } = useTranslation(["common"]);
  const { login } = dummyAuth0();

  return (
    <Button
      onClick={() => login()}
      variant="outline-success"
      className="btn-margin"
    >
      {t("navBar.login")}
    </Button>
  );
};

export default LoginButton;
