import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import { Container, ButtonGroup, Button, Alert } from "react-bootstrap";

const package_json = require("../../package.json");

const TestPage = () => {
  const { t } = useTranslation(["test"]);
  const { keycloak } = useKeycloak();
  const [message, setMessage] = useState("");

  const callPublicApi = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/api/public", {
        headers: {
          "macdap-app-title": "macdap-frontend",
          "macdap-app-version": package_json.version,
          "macdap-platform-type": navigator.userAgent,
          "macdap-platform-macdap-platform-id": navigator.platform,
        },
      });

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callPrivateApi = async () => {
    try {
      const token = keycloak.token;

      const response = await fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/api/private", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callPrivateScopedApi = async () => {
    try {
      const token = keycloak.token;

      const response = await fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/api/private-scoped", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container className="mb-5">
      <h1 className="d-flex justify-content-center">{t("title")}</h1>
      <Alert variant="danger"> Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Keycloak Audience value. </Alert>
        <ButtonGroup className="d-flex justify-content-center">
          <Button onClick={callPublicApi} color="primary" className="mt-5 m-1">
            Get public message
          </Button>
          <Button onClick={callPrivateApi} color="primary" className="mt-5 m-1" disabled={!keycloak.authenticated}>
            Get private message
          </Button>
          <Button onClick={callPrivateScopedApi} color="primary" className="mt-5 m-1" disabled={!keycloak.authenticated}>
            Get private-scoped message
          </Button>
        </ButtonGroup>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default TestPage;
