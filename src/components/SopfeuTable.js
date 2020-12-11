import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import SopfeuForm from './SopfeuForm';

function SopfeuTable({ items }) {

  const { t, i18n } = useTranslation(['sopfeu', 'common']);

  const [show, setShow] = useState(false);

  const onRowClickHandle = (index, item) => {
    // console.log(index);
    // console.log(items);
    // console.log(item);
    //setShow(true);
  }

  const sopfeuForm = <SopfeuForm />;

  const rowItems = items.map((item, index) => {
    const updatedAtDate = new Date(item.updatedAt);
    return (
      <tr key={item.id} onClick={() => onRowClickHandle(index, item)}>
        <td>{item.name}</td>
        <td>{updatedAtDate.toLocaleString(i18n.language)}</td>
        <td>{t(item.riskNowKey)}</td>
        <td>{t(item.riskTomorrowKey)}</td>
        <td>{t(item.riskAfterTomorrowKey)}</td>
        <td>{sopfeuForm}</td>
      </tr>
    )
  })

  return (
    <Table responsive hover striped bordered size="sm">
      <thead>
        <tr>
          <th>{t('fieldLabel.name')}</th>
          <th>{t('fieldLabel.updatedAt')}</th>
          <th>{t('fieldLabel.riskNow')}</th>
          <th>{t('fieldLabel.riskTomorrow')}</th>
          <th>{t('fieldLabel.riskAfterTomorrow')}</th>
        </tr>
      </thead>
      <tbody>
          {rowItems}
      </tbody>
    </Table>
  )
}

export default SopfeuTable