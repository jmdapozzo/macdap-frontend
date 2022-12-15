import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import ReactSpeedometer from "react-d3-speedometer";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function SopfeuForm({
  show,
  handleClose,
  riskColors,
  fireRisks,
  selectedFireRiskIndex,
}) {
  const { t } = useTranslation(["sopfeu", "common"]);

  const setButtonState = useCallback(
    (newFireRiskIndex) => {
      const leftButton = document.getElementById("left-button");
      const rightButton = document.getElementById("right-button");
      leftButton.disabled = newFireRiskIndex === 0;
      rightButton.disabled = newFireRiskIndex === fireRisks.length - 1;
    },
    [fireRisks.length]
  );

  const [currentFireRiskIndex, setCurrentFireRiskIndex] = useState(0);
  const handlePrevious = () => {
    const newFireRiskIndex = currentFireRiskIndex - 1;
    setButtonState(newFireRiskIndex);
    setCurrentFireRiskIndex(newFireRiskIndex);
  };

  const handleNext = () => {
    const newFireRiskIndex = currentFireRiskIndex + 1;
    setButtonState(newFireRiskIndex);
    setCurrentFireRiskIndex(newFireRiskIndex);
  };

  useEffect(() => {
    setButtonState(selectedFireRiskIndex);
    setCurrentFireRiskIndex(selectedFireRiskIndex);
  }, [selectedFireRiskIndex, setButtonState]);

  //animation is set to false to avoir warning findDOMNode is deprecated in StrictMode...
  return (
    <Modal
      show={show}
      animation={false}
      onHide={handleClose}
      dialogClassName={"primaryModal"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("dialog.title")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="justify-content-md-center">
          <ReactSpeedometer
            width={500}
            minValue={0.5}
            maxValue={5.5}
            paddingHorizontal={0}
            value={
              fireRisks[currentFireRiskIndex].riskNow === 0
                ? 0.5
                : fireRisks[currentFireRiskIndex].riskNow
            }
            needleHeightRatio={0.7}
            currentValueText={fireRisks[currentFireRiskIndex].name}
            valueTextFontSize={"20px"}
            customSegmentLabels={[
              {
                text: t("fireRisk.low"),
                position: "INSIDE",
                color: "#555",
              },
              {
                text: t("fireRisk.moderate"),
                position: "INSIDE",
                color: "#555",
              },
              {
                text: t("fireRisk.high"),
                position: "INSIDE",
                color: "#555",
                fontSize: "19px",
              },
              {
                text: t("fireRisk.veryHigh"),
                position: "INSIDE",
                color: "#555",
              },
              {
                text: t("fireRisk.extreme"),
                position: "INSIDE",
                color: "#555",
              },
            ]}
            ringWidth={47}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#90f2ff"}
            textColor={"#d8dee9"}
            segmentColors={[
              riskColors[1],
              riskColors[2],
              riskColors[3],
              riskColors[4],
              riskColors[5],
            ]}
          />
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button
                id="left-button"
                className="float-left"
                variant="primary"
                size="lg"
                onClick={handlePrevious}
              >
                <IoChevronBack />
              </Button>
            </Col>
            <Col>
              <h3 className="float-center">
                {fireRisks[currentFireRiskIndex].name}
              </h3>
            </Col>
            <Col>
              <Button
                id="right-button"
                className="float-right"
                variant="primary"
                size="lg"
                onClick={handleNext}
              >
                <IoChevronForward />
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default SopfeuForm;
