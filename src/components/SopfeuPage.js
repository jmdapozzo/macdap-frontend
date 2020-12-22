import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import SopfeuTable from './SopfeuTable'

function SopfeuPage(props) {

  const { t } = useTranslation(['sopfeu', 'common']);

  const [riskColors, setRiskColors] = useState([]);
  const [fireRisks, setFireRisks] = useState([]);
  const [result, setResult] = useState({ hasError: false});

  const getColors = () => {
    fetch('http://localhost:3001/sopfeu/risk-colors')
      .then(response => response.json())
      .then(riskColors => setRiskColors(riskColors))
      .catch(err => setResult({ hasError: true, message: err.message}))
  };

  const getFireRisks = () => {
    fetch('http://localhost:3001/sopfeu/fire-risks')
      .then(response => response.json())
      .then(fireRisks => setFireRisks(fireRisks))
      .catch(err => setResult({ hasError: true, message: err.message}))
  };

  useEffect(() => {
    getColors()
    getFireRisks()
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? <SopfeuTable riskColors={riskColors} fireRisks={fireRisks} /> : <Alert variant='danger'>{result.message}</Alert>}
        </Col>
      </Row>
    </Container>
  )
}

export default SopfeuPage
