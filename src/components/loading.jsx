import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  const { t } = useTranslation(["common"]);
  return (
    <Container fluid className="p-4">
      <Row className="pb-2 d-flex justify-content-center">{t("loading")}</Row>
      <Row className="d-flex justify-content-center">
        <Spinner />
      </Row>
    </Container>
  );
}

export default Loading;
