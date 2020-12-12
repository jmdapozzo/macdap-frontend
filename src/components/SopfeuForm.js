import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ReactSpeedometer from 'react-d3-speedometer';

function SopfeuForm({ show, handleClose, items, index }) {

  const { t } = useTranslation(['sopfeu', 'common']);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setCurrentValue(items[currentIndex].riskNow);
  }
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    setCurrentValue(items[currentIndex].riskNow);
  }

  useEffect(() => {
    setCurrentIndex(index)
  }, [index])

  return (
    <Modal show={show} onHide={handleClose} size="lg" dialogClassName={"primaryModal"}>
      <Modal.Header closeButton>
        <Modal.Title>{t('fireRiskTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <ReactSpeedometer
            width={500}
            minValue={1}
            maxValue={5}
            value={currentValue}
            needleHeightRatio={0.7}
            currentValueText={t('fireRiskTitle')}
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
      </Modal.Body>

      <Modal.Footer>
        <Container>
          <Row>
            <Col md="auto">
              <Button variant="primary" onClick={handlePrevious}>{t('common:buttonLabel.previous')}</Button>
            </Col>
            <Col>
              <h1>{items[currentIndex].name}</h1>
            </Col>
            <Col md="auto">
              <Button variant="primary" onClick={handleNext}>{t('common:buttonLabel.next')}</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal >
  )
}

export default SopfeuForm

