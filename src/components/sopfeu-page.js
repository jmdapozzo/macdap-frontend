import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SopfeuTable from "./sopfeu-table";

function SopfeuPage(props) {
  const { t } = useTranslation(["sopfeu", "common"]);

  const [riskColors, setRiskColors] = useState([]);
  const [fireRisks, setFireRisks] = useState([]);
  const [result, setResult] = useState({ hasError: false });

  const getColors = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/sopfeu/risk-colors/v1")
      .then((response) => response.json())
      .then((riskColors) => setRiskColors(riskColors))
      .catch((err) => setResult({ hasError: true, message: err.message }));
  };

  const getFireRisks = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/sopfeu/fire-risks/v1")
      .then((response) => response.json())
      .then((fireRisks) => setFireRisks(fireRisks))
      .catch((err) => setResult({ hasError: true, message: err.message }));
  };

  useEffect(() => {
    getColors();
    getFireRisks();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          {" "}
          {!result.hasError ? (
            <SopfeuTable riskColors={riskColors} fireRisks={fireRisks} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}{" "}
        </Col>{" "}
      </Row>{" "}
    </Container>
  );
}

export default SopfeuPage;
