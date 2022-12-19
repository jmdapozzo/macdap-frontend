import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import moment from "moment";
import "moment/locale/fr";
import DeviceForm from "./device-form";

function DeviceTable({ devices }) {
  const { t } = useTranslation(["device", "common"]);

  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOnRowClick = (index) => {
    setSelectedDeviceIndex(index);
    setShow(true);
  };

  return (
    <div>
      <Table responsive hover striped bordered size="sm">
        <thead>
          <tr>
            <th> {t("fieldLabel.platform_type")} </th>
            <th> {t("fieldLabel.platform_id")} </th>
            <th> {t("fieldLabel.owner")} </th>
            <th> {t("fieldLabel.initial_connection")} </th>
            <th> {t("fieldLabel.last_connection")} </th>
            <th> {t("fieldLabel.title")} </th>
            <th> {t("fieldLabel.version")} </th>
            <th> {t("fieldLabel.build_number")} </th>
            <th> {t("fieldLabel.connection_count")} </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr key={device.device_id} onClick={() => handleOnRowClick(index)}>
              <td> {device.platform_type} </td>
              <td> {device.platform_id} </td>
              <td> {device.owner} </td>
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
              <td> {device.title} </td>
              <td> {device.version} </td>
              <td> {device.build_number} </td>
              <td> {device.connection_count} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show ? (
        <DeviceForm
          show={show}
          handleClose={handleClose}
          devices={devices}
          selectedDeviceIndex={selectedDeviceIndex}
        />
      ) : null}
    </div>
  );
}

export default DeviceTable;
