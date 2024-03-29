import React from "react";
import { useTranslation } from "react-i18next";
import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo/medium.png";

function Header() {
  const { t } = useTranslation(["common"]);

  return (
    <Container fluid className="px-4">
      <Image src={logo} width={150} height={150}/>
      <p className="fs-2">{t("mission")}</p>
    </Container>
  );
}

export default Header;
