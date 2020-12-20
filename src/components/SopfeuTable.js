import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import SopfeuForm from './SopfeuForm';

function SopfeuTable({ riskColors, fireRisks }) {

  const { t, i18n } = useTranslation(['sopfeu', 'common']);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOnRowClick = (index) => {
    setSelectedFireRiskIndex(index);
    setShow(true);
  }

  const [selectedFireRiskIndex, setSelectedFireRiskIndex] = useState(null);

  const rowItems = fireRisks.map((fireRisk, index) => {
    const updatedAtDate = new Date(fireRisk.updatedAt);
    return (
      <tr key={fireRisk.id} onClick={() => handleOnRowClick(index)}>
        <td>{fireRisk.name}</td>
        <td>{updatedAtDate.toLocaleString(i18n.language)}</td>
        <td style={{ backgroundColor: riskColors[fireRisk.riskNow] }}>{t(fireRisk.riskNowKey)}</td>
        <td style={{ backgroundColor: riskColors[fireRisk.riskTomorrow] }}>{t(fireRisk.riskTomorrowKey)}</td>
        <td style={{ backgroundColor: riskColors[fireRisk.riskAfterTomorrow] }}>{t(fireRisk.riskAfterTomorrowKey)}</td>
      </tr>
    )
  })

  return (
    <div>
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
      {show ? <SopfeuForm show={show} handleClose={handleClose} riskColors={riskColors} fireRisks={fireRisks} selectedFireRiskIndex={selectedFireRiskIndex} /> : null}
    </div>
  )
}

export default SopfeuTable