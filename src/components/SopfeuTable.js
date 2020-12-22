import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import SopfeuForm from './SopfeuForm';
import { FaFire } from 'react-icons/fa';

function SopfeuTable({ riskColors, fireRisks }) {

  const { t, i18n } = useTranslation(['sopfeu', 'common']);

  const [selectedFireRiskIndex, setSelectedFireRiskIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOnRowClick = (index) => {
    setSelectedFireRiskIndex(index);
    setShow(true);
  }

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
          {
            fireRisks.map(
              (fireRisk, index) => (
                <tr key={fireRisk.id} onClick={() => handleOnRowClick(index)}>
                  <td>{fireRisk.name}</td>
                  <td>{(new Date(fireRisk.updatedAt)).toLocaleString(i18n.language)}</td>
                  <td>{t(fireRisk.riskNowKey)} <FaFire color={riskColors[fireRisk.riskNow]} /></td>
                  <td>{t(fireRisk.riskTomorrowKey)} <FaFire color={riskColors[fireRisk.riskTomorrow]} /></td>
                  <td>{t(fireRisk.riskAfterTomorrowKey)} <FaFire color={riskColors[fireRisk.riskAfterTomorrow]} /></td>
                </tr>
              )
            )
          }
        </tbody>
      </Table>
      {show ? <SopfeuForm show={show} handleClose={handleClose} riskColors={riskColors} fireRisks={fireRisks} selectedFireRiskIndex={selectedFireRiskIndex} /> : null}
    </div>
  )
}

export default SopfeuTable