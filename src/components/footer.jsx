import React from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  const { t } = useTranslation(["common"]);
  return (
    <Container fluid className="px-4">
      <Row>
        <Col className="d-flex justify-content-start">
          Copyright &copy; {t("company")} {new Date().getFullYear()}
        </Col>
        <Col className="d-flex justify-content-center">
          {t("version")} {process.env.REACT_APP_VERSION}
        </Col>
        <Col className="d-flex justify-content-end">
          {t("brand")}
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
