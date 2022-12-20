import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import DeviceTable from "./device-table";

function DevicePage(props) {
  const [devices, setDevices] = useState([]);
  const [result, setResult] = useState({ hasError: false });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getDevices = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          process.env.REACT_APP_SERVER_ENDPOINT + "/device/v2",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const responseData = await response.json();
  
        setDevices(responseData);
      } catch (error) {
        setResult({ hasError: true, message: error.message });
      }
    };

    getDevices();
  }, [getAccessTokenSilently]);

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? (
            <DeviceTable devices={devices} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}{" "}
        </Col>{" "}
      </Row>{" "}
    </Container>
  );
}

export default DevicePage;
