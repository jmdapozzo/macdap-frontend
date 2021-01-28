import React from "react";
import { useTranslation } from "react-i18next";
import { Jumbotron, Image, Container } from "react-bootstrap";
import logo from "../assets/images/logo/noBackgroundNoText.svg";

function Header() {
  const { t } = useTranslation(["common"]);

  return (
    <Jumbotron className="mb-0">
      <div className="overlay" />
      <Container>
        <div className="d-inline-flex p-3">
          <div>
            <Image src={logo} width={100} height={100} />
          </div>
          <div>
            <h1 className="company">{t("company")}</h1>
            <h3>{t("mission")}</h3>
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default Header;
