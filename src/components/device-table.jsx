import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import "moment/locale/fr";
import DeviceForm from "./device-form";

const formatOwner = (company, contact, email) => {
  if (company && contact) {
    return `${company} (${contact})`;
  } else if (!company && contact) {
    return `${contact}`;
  } else if (company && !contact) {
    return `${company}`;
  } else if (email) {
    return `${email}`;
  } else {
    return "---";
  }
};

const formatVersion = (version, isLocked) => {
  if (isLocked) {
    return `🔒 ${version}`;
  } else {
    return version;
  }
};

const formatPlatformIdentification = (type, id) => {
  const truncID = parseInt(id.substring(0, 8), 16);
  return `${type}-${truncID.toString(16)}`.toLowerCase();
};

const formatLastSeen = (lastSeen) => {
  if (lastSeen) {
    return moment
      .duration(moment(lastSeen).diff(moment()))
      .locale(navigator.language)
      .humanize(true);
  } else {
    return "---";
  }
};

const formatRow = (initialConnection, lastSeen) => {
  const initialConnectionMoment = moment(initialConnection);
  const lastSeenMoment = moment(lastSeen);
  const dayDiff = moment().diff(initialConnectionMoment, "days");
  const hourDiff = moment().diff(lastSeenMoment, "hours");

  if (dayDiff > 1 && (!lastSeen || hourDiff > 24)) {
    return "table-danger";
  } else {
    return "";
  }
};

function DeviceTable({ devices, updateDeviceOwner, updateDeviceLockVersion }) {
  const { t } = useTranslation(["device", "common"]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = (device) => {
    if (device !== null) {
      updateDeviceOwner(device);
    }
    setSelectedDevice(null);
    setShow(false);
  };

  const handleEdit = (device) => {
    let editDevice = { ...device }
    setSelectedDevice(editDevice);
    setShow(true);
  };

  const handleOnToggleLock = (device) => {
    let editDevice = { ...device }
    let confirmToggleLock = window.confirm(
      editDevice.lock_version
        ? t("device:alertMsg.areYouSureUnlockDevice")
        : t("device:alertMsg.areYouSureLockDevice")
    );
    if (confirmToggleLock) {
      editDevice.lock_version = !editDevice.lock_version;
      updateDeviceLockVersion(editDevice);
    }
  };

  return (
    <div>
      <Table responsive hover striped bordered size="sm">
        <thead>
          <tr>
            <th> {t("fieldLabel.platform_identification")} </th>
            <th> {t("fieldLabel.platform_type")} </th>
            <th> {t("fieldLabel.platform_id")} </th>
            <th> {t("fieldLabel.owner")} </th>
            <th> {t("fieldLabel.initial_connection")} </th>
            <th> {t("fieldLabel.last_connection")} </th>
            <th> {t("fieldLabel.last_seen")} </th>
            <th> {t("fieldLabel.title")} </th>
            <th> {t("fieldLabel.version")} </th>
            <th> {t("fieldLabel.build_number")} </th>
            <th> {t("fieldLabel.connection_count")} </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr
              className={formatRow(device.initial_connection, device.last_seen)}
              key={device.device_id}
            >
              <td>
                {" "}
                {formatPlatformIdentification(
                  device.platform_type,
                  device.platform_id
                )}{" "}
              </td>
              <td> {device.platform_type} </td>
              <td> {device.platform_id} </td>
              <td>
                {" "}
                {formatOwner(
                  device.company_name,
                  device.contact_name,
                  device.contact_email
                )}
              </td>
              <td>
                {moment(device.initial_connection)
                  .locale(navigator.language)
                  .format("lll")}
              </td>
              <td>
                {moment
                  .duration(moment(device.last_connection).diff(moment()))
                  .locale(navigator.language)
                  .humanize(true)}
              </td>
              <td>{formatLastSeen(device.last_seen)}</td>
              <td>{device.title}</td>
              <td>{formatVersion(device.version, device.lock_version)}</td>
              <td> {device.build_number} </td>
              <td> {device.connection_count} </td>
              <td>
                <Button onClick={() => handleEdit(device)}>
                  {t("common:buttonLabel.edit")}
                </Button>
              </td>
              <td>
                <Button onClick={() => handleOnToggleLock(device)}>
                  {t("device:buttonLabel.unlock")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show ? (
        <DeviceForm show={show} close={handleClose} device={selectedDevice} />
      ) : null}
    </div>
  );
}

export default DeviceTable;
