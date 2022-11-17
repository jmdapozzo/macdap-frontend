import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const SignupButton = () => {
  const { t } = useTranslation(["common"]);

  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
      variant="btn-outline-success"
      className="btn-margin"
    >
      {t("navBar.signup")}
    </Button>
  );
};

export default SignupButton;
