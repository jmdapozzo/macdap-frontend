import React from "react";
import { dummyAuth0 } from "../auth/dummy-auth0";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { t } = useTranslation(["common"]);
  const { logout } = dummyAuth0();

  return (
    <Button
      onClick={() => logout()}
      variant="outline-danger"
      className="btn-margin"
    >
      {t("navBar.logout")}
    </Button>
  );
};

export default LogoutButton;
