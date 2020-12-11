import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import SopfeuTable from './SopfeuTable'

function SopfeuPage(props) {

  const { t } = useTranslation(['users', 'common']);
  const [items, setItems] = useState([])

  const getItems = () => {
    fetch('http://localhost:3001/sopfeu/fire-risks')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <SopfeuTable items={items} />
        </Col>
      </Row>
    </Container>
  )
}

export default SopfeuPage
