import React from "react";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { t } = useTranslation(["common"]);
  const { keycloak } = useKeycloak();

  return (
    <Button
      onClick={() => keycloak.logout()}
      variant="outline-danger"
      className="btn-margin"
    >
      {t("navBar.logout")} {keycloak.tokenParsed.preferred_username}
    </Button>
  );
};

export default LogoutButton;
