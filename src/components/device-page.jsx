import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading";
import { Container, Row, Col, Alert } from "react-bootstrap";
import DeviceTable from "./device-table";

function DevicePage(props) {
  const { t } = useTranslation(["device", "common"]);

  const [devices, setDevices] = useState([]);
  const [result, setResult] = useState({ hasError: false });

  const { getAccessTokenSilently, isLoading } = useAuth0();

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

  const updateDeviceOwner = async (device) => {

    let bodyData = {
      device_owner_id: device.device_owner_id,
      company_name: device.company_name,
      contact_name: device.contact_name,
      contact_email: device.contact_email,
      location_name: device.location_name
    };

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        process.env.REACT_APP_SERVER_ENDPOINT + "/device/v2/owner",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      const responseData = await response.json();
      if (responseData.putOwner === true) {
        const deviceIndex = devices.findIndex((data) => data.device_id === device.device_id);
        const newDeviceArray = [
          ...devices.slice(0, deviceIndex),
          device,
          ...devices.slice(deviceIndex + 1),
        ];
        setDevices(newDeviceArray);
      }else{
        setResult({ hasError: true, message: t("device:errorMsg.cannotUpdateDevice") });
      }
    } catch (error) {
      setResult({ hasError: true, message: error.message });
    }
  };

  const updateDeviceLockVersion = async (device) => {
    let bodyData = {
      device_application_id: device.device_application_id,
      lock_version: device.lock_version,
    };

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        process.env.REACT_APP_SERVER_ENDPOINT + "/device/v2/lock-version",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      const responseData = await response.json();
      if (responseData.putLockVersion === true) {
        const deviceIndex = devices.findIndex((data) => data.device_id === device.device_id);
        const newDeviceArray = [
          ...devices.slice(0, deviceIndex),
          device,
          ...devices.slice(deviceIndex + 1),
        ];
        setDevices(newDeviceArray);
      }else{
        setResult({ hasError: true, message: t("device:errorMsg.cannotChangeLockStatus") });
      }
    } catch (error) {
      setResult({ hasError: true, message: error.message });
    }
  };

  if (isLoading) {
    <Loading />;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? (
            <DeviceTable
              devices={devices}
              updateDeviceOwner={updateDeviceOwner}
              updateDeviceLockVersion={updateDeviceLockVersion}
            />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DevicePage;
