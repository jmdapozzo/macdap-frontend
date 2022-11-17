import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { t } = useTranslation(["common"]);

  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
      variant="outline-danger"
      className="btn-margin"
    >
      {t("navBar.logout")}
    </Button>
  );
};

export default LogoutButton;
