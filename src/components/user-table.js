import React from 'react'
import { useTranslation } from 'react-i18next';
import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import UserForm from './user-form'
import { FaTrashAlt } from 'react-icons/fa';

function UserTable(props) {

  const { t } = useTranslation(['users', 'common']);

  const deleteItem = id => {
    let confirmDelete = window.confirm(t('common:alertMsg.areYouSureDeleteItem'))
    if (confirmDelete) {
      fetch(process.env.REACT_APP_SERVER_URL + '/users', {
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

  return (
    <Table responsive hover striped bordered size="sm">
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
        {
          props.items.map(
            item => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.first}</td>
                <td>{item.last}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>{item.hobby}</td>
                <td>
                  <div>
                    <UserForm buttonLabel={t('common:buttonLabel.edit')} item={item} updateState={props.updateState} />
                    <OverlayTrigger placement="top" delay="500" overlay={<Tooltip>{t('common:buttonLabel.delete')}</Tooltip>}>
                      <FaTrashAlt style={{ marginRight: "10px" , marginLeft: "10px" }} onClick={() => deleteItem(item.id)} />
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
  )
}

export default UserTable