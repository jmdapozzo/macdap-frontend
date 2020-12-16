import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import SopfeuTable from './SopfeuTable'

function SopfeuPage(props) {

  const { t } = useTranslation(['sopfeu', 'common']);

  const [riskColors, setRiskColors] = useState([]);
  const [fireRisks, setFireRisks] = useState([]);

  const getColors = () => {
    fetch('http://localhost:3001/sopfeu/risk-colors')
      .then(response => response.json())
      .then(riskColors => setRiskColors(riskColors))
      .catch(err => console.log(err))
  };

  const getFireRisks = () => {
    fetch('http://localhost:3001/sopfeu/fire-risks')
      .then(response => response.json())
      .then(fireRisks => setFireRisks(fireRisks))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getColors()
    getFireRisks()
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <SopfeuTable riskColors={riskColors} fireRisks={fireRisks} />
        </Col>
      </Row>
    </Container>
  )
}

export default SopfeuPage
