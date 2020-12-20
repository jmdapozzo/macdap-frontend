import React from "react";
import { useTranslation } from 'react-i18next';
import { Jumbotron } from 'react-bootstrap';


function Footer() {

  const { t } = useTranslation(['common']);

  return (
    <div className="footer">
      <Jumbotron className="mb-0">
        <div className="d-inline-flex p-3">
          <p className="m-0 text-center">
            Copyright &copy; {t('company')} 2020 - {new Date().getFullYear()}
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}

export default Footer;
