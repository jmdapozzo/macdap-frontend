import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import SopfeuForm from "./sopfeu-form";
import { ImFire } from "react-icons/im";

function SopfeuTable({ riskColors, fireRisks }) {
  const { t, i18n } = useTranslation(["sopfeu", "common"]);

  const [selectedFireRiskIndex, setSelectedFireRiskIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOnRowClick = (index) => {
    setSelectedFireRiskIndex(index);
    setShow(true);
  };

  return (
    <div>
      <Table responsive hover striped bordered size="sm">
        <thead>
          <tr>
            <th style={{ width: "30%" }}> {t("fieldLabel.name")} </th>{" "}
            <th style={{ width: "20%" }}> {t("fieldLabel.updatedAt")} </th>{" "}
            <th style={{ width: "10%" }}> {t("fieldLabel.riskNow")} </th>{" "}
            <th style={{ width: "10%" }}> {t("fieldLabel.riskTomorrow")} </th>{" "}
            <th style={{ width: "10%" }}>
              {" "}
              {t("fieldLabel.riskAfterTomorrow")}{" "}
            </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {fireRisks.map((fireRisk, index) => (
            <tr key={fireRisk.id} onClick={() => handleOnRowClick(index)}>
              <td>
                <div className="table-cell-with-icon"> {fireRisk.name} </div>{" "}
              </td>{" "}
              <td>
                <div className="table-cell-with-icon">
                  {" "}
                  {new Date(fireRisk.updatedAt).toLocaleString(
                    i18n.language
                  )}{" "}
                </div>{" "}
              </td>{" "}
              <td>
                <div className="table-cell-with-icon">
                  <ImFire color={riskColors[fireRisk.riskNow]} />{" "}
                </div>{" "}
                <div className="table-cell-with-icon">
                  {" "}
                  {t(fireRisk.riskNowKey)}{" "}
                </div>{" "}
              </td>{" "}
              <td>
                <div className="table-cell-with-icon">
                  <ImFire color={riskColors[fireRisk.riskTomorrow]} />{" "}
                </div>{" "}
                <div className="table-cell-with-icon">
                  {" "}
                  {t(fireRisk.riskTomorrowKey)}{" "}
                </div>{" "}
              </td>{" "}
              <td>
                <div className="table-cell-with-icon">
                  <ImFire color={riskColors[fireRisk.riskAfterTomorrow]} />{" "}
                </div>{" "}
                <div className="table-cell-with-icon">
                  {" "}
                  {t(fireRisk.riskAfterTomorrowKey)}{" "}
                </div>{" "}
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </Table>{" "}
      {show ? (
        <SopfeuForm
          show={show}
          handleClose={handleClose}
          riskColors={riskColors}
          fireRisks={fireRisks}
          selectedFireRiskIndex={selectedFireRiskIndex}
        />
      ) : null}{" "}
    </div>
  );
}

export default SopfeuTable;
