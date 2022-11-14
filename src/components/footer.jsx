import React from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  const { t } = useTranslation(["common"]);

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-start">
          Copyright &copy; {t("company")} {new Date().getFullYear()}
        </Col>
        <Col className="d-flex justify-content-center">
          <div>Version 0.0.0</div>
        </Col>
        <Col className="d-flex justify-content-end">
          <a href="https://macdap.net" class="link-primary">
            {t("brand")}
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
