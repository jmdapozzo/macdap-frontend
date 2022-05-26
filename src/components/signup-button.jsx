import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const SignupButton = () => {
  const { t, i18n } = useTranslation(["common"]);

  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
      variant="primary"
      className="btn-margin"
    >
      {t("navBar.signup")}
    </Button>
  );
};

export default SignupButton;
