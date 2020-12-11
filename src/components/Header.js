import React from 'react'
import { useTranslation } from 'react-i18next';
import { Jumbotron, Image } from 'react-bootstrap';
import logo from '../images/logo/noBackgroundNoText.svg';

function Header() {

  const { t } = useTranslation(['common']);

  return (
    <div className="header">

      <Jumbotron className="mb-0">
        <div className="d-inline-flex p-3">
          <div className="p-2">
            <Image src={logo} width={100} height={100} />
          </div>
          <div className="p-2">
            <h1 className="company">{t('company')}</h1>
            <h3>{t('mission')}</h3>
          </div>
        </div>
      </Jumbotron>
    </div>
  )
}

export default Header
