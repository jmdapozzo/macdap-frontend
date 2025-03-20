import React from "react";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { t } = useTranslation(["common"]);
  const { keycloak } = useKeycloak();

  return (
    <Button
      onClick={() => keycloak.login()}
      variant="outline-success"
      className="btn-margin"
    >
      {t("navBar.login")}
    </Button>
  );
};

export default LoginButton;
