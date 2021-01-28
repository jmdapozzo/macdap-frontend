import React from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { t } = useTranslation(["common"]);

  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="primary"
      className="btn-margin"
    >
      {t("navBar.login")}
    </Button>
  );
};

export default LoginButton;
