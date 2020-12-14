import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ReactSpeedometer from 'react-d3-speedometer';

function SopfeuForm({ show, handleClose, items, index }) {

  const { t } = useTranslation(['sopfeu', 'common']);

  function SetButtonState(newIndex) {
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    leftButton.disabled = newIndex === 0;
    rightButton.disabled = newIndex === (items.length - 1);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    SetButtonState(newIndex);
    setCurrentIndex(newIndex);
  }
  const handleNext = () => {
    const newIndex = currentIndex + 1;
    SetButtonState(newIndex);
    setCurrentIndex(newIndex);
  }

  useEffect(() => {
    SetButtonState(index);
    setCurrentIndex(index);
  }, [index])

  return (
    <Modal show={show} onHide={handleClose} dialogClassName={"modal-90w modal-dialog primaryModal"}>
      <Modal.Header closeButton>
        <Modal.Title>{t('fireRiskTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="justify-content-md-center">
          <ReactSpeedometer
            width={500}
            minValue={0.5}
            maxValue={5.5}
            paddingHorizontal={0}
            value={items[currentIndex].riskNow === 0 ? 0.5 : items[currentIndex].riskNow}
            needleHeightRatio={0.7}
            currentValueText={items[currentIndex].name}
            valueTextFontSize={20}
            customSegmentLabels={[
              {
                text: t('fireRisk.low'),
                position: 'INSIDE',
                color: '#555',
              },
              {
                text: t('fireRisk.moderate'),
                position: 'INSIDE',
                color: '#555',
              },
              {
                text: t('fireRisk.high'),
                position: 'INSIDE',
                color: '#555',
                fontSize: '19px',
              },
              {
                text: t('fireRisk.veryHigh'),
                position: 'INSIDE',
                color: '#555',
              },
              {
                text: t('fireRisk.extreme'),
                position: 'INSIDE',
                color: '#555',
              },
            ]}
            ringWidth={47}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={'#90f2ff'}
            textColor={'#d8dee9'}
            segmentColors={[
              "#528EDC",
              "#87C905",
              "#E3E226",
              "#F58723",
              "#CC170E",
            ]}
          />
        </Row>

      </Modal.Body>

      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button id="left-button" className="float-left" variant="primary" onClick={handlePrevious}>{t('common:buttonLabel.previous')}</Button>
            </Col>
            <Col>
              <Button id="right-button" className="float-right" variant="primary" onClick={handleNext}>{t('common:buttonLabel.next')}</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal >
  )
}

export default SopfeuForm

