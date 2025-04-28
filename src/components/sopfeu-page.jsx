import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "./loading";
import SopfeuTable from "./sopfeu-table";

const package_json = require("../../package.json");

function SopfeuPage(props) {
  const { keycloak } = useKeycloak();
  const [riskColors, setRiskColors] = useState([]);
  const [fireRisks, setFireRisks] = useState([]);
  const [result, setResult] = useState({ hasError: false });

  useEffect(() => {
    const getColors = async () => {
      try {
        const token = keycloak.token;
        const response = await fetch(
          process.env.REACT_APP_SERVER_ENDPOINT + "/sopfeu/fire-risks/v1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "macdap-app-title": "macdap-frontend",
              "macdap-app-version": package_json.version,
              "macdap-platform-type": navigator.userAgent,
              "macdap-platform-macdap-platform-id": navigator.platform
            },
          }
        );
  
        const responseData = await response.json();
  
        setFireRisks(responseData);
      } catch (error) {
        setResult({ hasError: true, message: error.message });
      }
    };

    const getFireRisks = async () => {
      try {
        const token = keycloak.token;
        const response = await fetch(
          process.env.REACT_APP_SERVER_ENDPOINT + "/sopfeu/risk-colors/v1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "macdap-app-title": "macdap-frontend",
              "macdap-app-version": package_json.version,
              "macdap-platform-type": navigator.userAgent,
              "macdap-platform-macdap-platform-id": navigator.platform
            },
          }
        );
  
        const responseData = await response.json();
  
        setRiskColors(responseData);
      } catch (error) {
        setResult({ hasError: true, message: error.message });
      }
    };

    getColors();
    getFireRisks();
  }, [keycloak]);

  if (!fireRisks || !riskColors) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? (
            <SopfeuTable riskColors={riskColors} fireRisks={fireRisks} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SopfeuPage;
