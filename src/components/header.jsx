import React from "react";
import { useTranslation } from "react-i18next";
import { Jumbotron, Image, Container } from "react-bootstrap";
import logo from "../assets/images/logo/noBackgroundNoText.svg";

function Header() {
  const { t } = useTranslation(["common"]);

  return (
    <div className="p-1 mb-0 bg-light rounded-3">
      <div className="container-fluid py-5">
        <div>
          <Image src={logo} width={100} height={100} />
        </div>
        <h1 className="display-5 fw-bold">{t("company")}</h1>
        <p className="col-md-8 fs-4">{t("mission")}</p>
      </div>
    </div>
  );
}

export default Header;
