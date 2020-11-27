import React, { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

function App(props) {

  const { t, i18n } = useTranslation(['users', 'common']);
  const [items, setItems] = useState([])

  const getItems = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>{t('title.dataTable')}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}>
            {t('common:buttonLabel.export')}
          </CSVLink>
          <ModalForm buttonLabel={t('common:buttonLabel.add')} addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
