import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { dummyAuth0 } from "../auth/dummy-auth0";
import { Container, ButtonGroup, Button, Alert } from "react-bootstrap";

const TestPage = () => {
  const { t } = useTranslation(["test"]);
  const [message, setMessage] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_ENDPOINT;

  const { getAccessToken } = dummyAuth0();

  const callPublicApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/public`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callPrivateApi = async () => {
    try {
      const token = await getAccessToken();

      const response = await fetch(`${serverUrl}/api/private`, {
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
      const token = await getAccessToken({
        ignoreCache: true,
        scope: 'test-role',
      });

      const response = await fetch(`${serverUrl}/api/private-scoped`, {
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

  const callPrivateIotApi = async () => {
    try {
      const token = await getAccessToken();

      const response = await fetch(`${serverUrl}/api/iot/private`, {
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

  const callPrivateScopedIotApi = async () => {
    try {
      const token = await getAccessToken({
        ignoreCache: true,
        scope: 'test-role',
      });

      const response = await fetch(`${serverUrl}/api/iot/private-scoped`, {
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
        <ButtonGroup>
          <Button onClick={callPublicApi} color="primary" className="mt-5 m-1">
            Get public message
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={callPrivateApi} color="primary" className="mt-5 m-1">
            Get private message
          </Button>
          <Button onClick={callPrivateScopedApi} color="primary" className="mt-5 m-1">
            Get private-scoped message
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={callPrivateIotApi} color="primary" className="mt-5 m-1">
            Get private iot message
          </Button>
          <Button onClick={callPrivateScopedIotApi} color="primary" className="mt-5 m-1">
            Get private-scoped iot message
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
