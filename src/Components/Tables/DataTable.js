import React from 'react'
import { useTranslation } from 'react-i18next';
import { Table, Button } from 'react-bootstrap';
import UserForm from '../modals/UserForm'

function DataTable(props) {

  const { t } = useTranslation(['users', 'common']);

  const deleteItem = id => {
    let confirmDelete = window.confirm(t('common:alertMsg.areYouSureDeleteItem'))
    if (confirmDelete) {
      fetch('http://localhost:3001/users', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.first}</td>
        <td>{item.last}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.location}</td>
        <td>{item.hobby}</td>
        <td>
          <div style={{ width: "160px" }}>
            <UserForm buttonLabel={t('common:buttonLabel.edit')} item={item} updateState={props.updateState} />
            {' '}
            <Button variant="danger" onClick={() => deleteItem(item.id)}>{t('common:buttonLabel.delete')}</Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>{t('fieldLabel.id')}</th>
          <th>{t('fieldLabel.first')}</th>
          <th>{t('fieldLabel.last')}</th>
          <th>{t('fieldLabel.email')}</th>
          <th>{t('fieldLabel.phone')}</th>
          <th>{t('fieldLabel.location')}</th>
          <th>{t('fieldLabel.hobby')}</th>
          <th>{t('fieldLabel.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable