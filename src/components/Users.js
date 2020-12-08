import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import UserForm from './modals/UserForm'
import DataTable from './tables/DataTable'
import { CSVLink } from "react-csv"

function Users(props) {

  const { t } = useTranslation(['users', 'common']);
  const [items, setItems] = useState([])

  const getItems = () => {
    fetch('http://localhost:3001/users')
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
    <Container fluid className="Users">
      <Row>
        <Col>
          <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"db.csv"}
            variant="secondary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}>
            {t('common:buttonLabel.export')}
          </CSVLink>
          <UserForm buttonLabel={t('common:buttonLabel.add')} addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default Users
