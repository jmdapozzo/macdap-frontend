import React from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function HomePage() {
  const { t } = useTranslation(["home"]);

  return (
    <Container fluid>
      <Row>
        <h1 className="d-flex justify-content-center">{t("title")}</h1>
      </Row>
    </Container>
  );
}
export default HomePage;
