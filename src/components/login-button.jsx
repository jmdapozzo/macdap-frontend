import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { t } = useTranslation(["common"]);

  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="outline-success"
      className="btn-margin"
    >
      {t("navBar.login")}
    </Button>
  );
};

export default LoginButton;
